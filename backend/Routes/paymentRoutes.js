import express from 'express';
import Payment from '../Models/Payment.js';
import { authenticateToken } from '../Middleware/auth.js';
import Stripe from 'stripe';
import axios from 'axios';
import { validatePayment } from '../Middleware/validatePayment';


const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment (Stripe or MPesa)
router.post('/', authenticateToken, validatePayment, async (req, res) => {
    try {
        const { method, amount, reference, currency = 'KES', meta = {} } = req.body;

        // If Stripe: Create PaymentIntent
        if (method === 'stripe') {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // cents
                currency,
                metadata: { reference }
            });
            meta.client_secret = paymentIntent.client_secret;
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
                headers: { Authorization: `Bearer ${process.env.MPESA_ACCESS_TOKEN}` }
            });
            meta.mpesa_response = response.data;
        }

        // Save payment in Database
        const payment = new Payment({
            user: req.user.id,
            method,
            amount,
            currency,
            reference,
            status: req.paymentStatus,
            meta: req.meta
        });

        await payment.save();
        res.status(201).json({ message: 'Payment created', payment });
    } catch (error) {
        console.error('❌ Payment error:', error);
        res.status(500).json({ error: 'Payment failed', details: error.message });
    }
});


// Verify payment status
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('user', 'name email');
        if (!payment) return res.status(404).json({ error: 'Payment not found' });
        res.json({ payment });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment' });
    }
});


// Get all payments for a user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payments' });
    }
});

export default router;