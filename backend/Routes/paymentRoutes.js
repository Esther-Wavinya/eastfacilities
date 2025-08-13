// Express router that handles payment operations using Stripe and M-Pesa, including creating payments, verifying their status, and retrieving payment history for authenticated users.
import express from 'express'; // Sets up the router
import Payment from '../Models/Payment.js'; // Mongoose model for storing payment records
import { authenticateToken } from '../Middleware/auth.js'; // Middleware to verify user authentication(likely via JWT)
import Stripe from 'stripe'; // Stripe SDK for handling card payments
import axios from 'axios'; // Used to make HTTP requests (e.g., to M-Pesa API)
import { validatePayment } from '../Middleware/validatePayment'; // Middleware to confirm payment status before saving



const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment (Stripe or MPesa)
// authenticateToken checks if the user is logged in. 
// validatePayment (from express-validator) checks if the request body is valid: 
// 1. Is the method allowed?
// 2. Is the amount positive?
// 3. Is the reference provided?
// If valid:
// 1. If method === 'stripe', it creates s Stripe PaymentIntent
// 2. If method === 'mpesa', it sends an STK Push to Safaricom
// The response from Stripe or M-Pesa is stored in meta.
// A new Payment document is created and saved in MongoDB
// The user can later:
// 1. View the payment via GET /:id
// 2. See all their payments via GET /
router.post('/', authenticateToken, validatePayment, async (req, res) => { // authenticates the user, validates the payment using Stripe or M-Pesa, creates a payment record in the database
    try {
        const { method, amount, reference, currency = 'KES', meta = {} } = req.body;

        // If Stripe: Create PaymentIntent
        if (method === 'stripe') {
            const paymentIntent = await stripe.paymentIntents.create({ // Creates a Stripe PaymentIntent
                amount: Math.round(amount * 100), // Stripe uses cents
                currency,
                metadata: { reference }
            });
            meta.client_secret = paymentIntent.client_secret; // Stores the client_secret in meta for frontend use
        }

        // If MPesa: send request to STK Push API (example)
        if (method === 'mpesa') {
            const response = await axios.post(process.env.MPESA_API_URL, {
                BusinessShortCode: process.env.MPESA_SHORTCODE,
                Password: process.env.MPESA_PASSWORD,
                Timestamp: Date.now().toString(),
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: meta.phone, // customer's phone
                PartyB: process.env.MPESA_SHORTCODE,
                PhoneNumber: meta.phone,
                CallBackURL: process.env.MPESA_CALLBACK_URL,
                AccountReference: reference,
                TransactionDesc: "Payment"
            }, {
                headers: { Authorization: `Bearer ${process.env.MPESA_ACCESS_TOKEN}` } // Sends an STK Push request to M-Pesa
            });
            meta.mpesa_response = response.data; // Stores the response in meta
        }

        // Save payment in Database.
        const payment = new Payment({
            user: req.user.id,
            method,
            amount,
            currency,
            reference,
            status: req.paymentStatus,
            meta: req.meta // Saves the validated payment with metadata and status
        });

        await payment.save();
        res.status(201).json({ message: 'Payment created', payment });
    } catch (error) {
        console.error('❌ Payment error:', error);
        res.status(500).json({ error: 'Payment failed', details: error.message });
    }
});


// Verify payment status
router.get('/:id', authenticateToken, async (req, res) => { // Fetches a specific payment by its MongoDB ID.
    try {
        const payment = await Payment.findById(req.params.id).populate('user', 'name email'); // After fetching the payment, it populates the user field with name and email
        if (!payment) return res.status(404).json({ error: 'Payment not found' });
        res.json({ payment });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment' });
    }
});


// Get all payments for a user
router.get('/', authenticateToken, async (req, res) => { // Returns all payments made by the authenticated user. 
    try {
        const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 }); // The payments are sorted by the newest to appear first.
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payments' });
    }
});

export default router;


































































