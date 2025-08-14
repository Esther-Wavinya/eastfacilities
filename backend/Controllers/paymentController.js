import axios from "axios";
import Payment from "../Models/Payment.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// ---------------- CREATE STRIPE PAYMENT ----------------
export const createStripePayment = async (req, res) => {
  try {
    const { amount, currency = "usd", booking, metadata } = req.body;

    // Ensure booking exists
    const existingBooking = await booking.findById(booking);
    if (!existingBooking) {
      return res.status(404).json({ error: "Booking bot found" });
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects cents
      currency,
      metadata
    });

    // Save to DB
    const payment = await Payment.create({
      ...req.body,
      user: req.user.id,
      booking, // link to booking explicitly
      amount,
      provider: "stripe",
      status: "pending",
      reference: paymentIntent.id,
      metadata
    });

    // Return client secret
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      payment
    });
  } catch (error) {
    console.error("Stripe payment error:", error.message);
    res.status(500).json({ error: "Stripe payment initialization failed" });
  }
};

// ---------------- CREATE MPESA PAYMENT ----------------
export const createMpesaPayment = async (req, res) => {
  try {
    const { amount, phoneNumber, booking, metadata } = req.body;

    // Ensure booking exists
    const existingBooking = await booking.findById(booking);
    if (!existingBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Call M-Pesa STK Push API
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BuseinessShortCode: process.env.MPESA_SHORTCODE,
        Password: process.env.MPESA_PASSWORD,
        Timestamp: new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14),
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: `${process.env.SERVER_URL}/api/payments/mpesa/callback`,
        AccountReference: "BookingPayment",
        TransactionDesc: "Payment for booking"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MPESA_ACCESS_TOKEN}`,
          "content-Type": "application/json"
        }
      }
    );

    // Save to DB
    res.status(201).json({
      message: "M-Pesa STK Push initiated",
      checkoutRequestID: response.data.checkoutRequestID,
      payment
    });
  } catch (error) {
    console.error("M-Pesa payment error:", error.response?.data || error.message);
    res.status(500).json({ error: "M-Pesa payment initialization failed" });
  }
};


// ----- NEW PAYSTACK CONTROLLER -----
export const createPaystackPayment = async (req, res) => {
  try {
    const { amount, email, booking, metadata } = req.body;

    // Ensure booking exists
    const existingBooking = await booking.findById(booking);
    if (!existingBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Initialize Paystack payment
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Paystack expects cents
        metadata,
        callback_url: `${process.env.CLIENT_URL}/payment/callback`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Store pending payment in MongoDB
    const payment = await Payment.create({
      user: req.user.id,
      booking,    // save the booking link
      amount,
      provider: "paystack",
      status: "pending",
      reference: response.data.data.reference,
      metadata
    });

    // Return Paystack authorization URL to frontend
    res.status(201).json({
      authorization_url: response.data.data.authorization_url,
      reference: response.data.data.reference,
      paymentId: payment._id
    });
  } catch (error) {
    console.error("Paystack init error:", error.response?.data || error.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
};

export const getUserPayments = async (req, res) => {
  const payments = await Payment.find({ user: req.user.id }).populate("booking");
  res.json(payments);
};

export const getPaymentById = async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate("user booking");
  if (!payment) return res.status(404).json({ error: "Payment not found" });
  res.json(payment);
};


// (Optional) Verify payment after callback or webhook
export const verifyPaystackPayment = async (req, res) => {
  try {
    const { reference } = req.query;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
      }
    );

    const { status, amount } = response.data.data;

    const payment = await Payment.findOneAndUpdate(
      { reference },
      { status, amount: amount / 100 }, // convert back to NGN
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: "Payment record not found" });
    }

    res.json({ message: "Payment verified successfully", payment });
  } catch (error) {
    console.error("Paystack verification error:", error.response?.data || error.message);
    res.status(500).json({ error: "Payment verification failed" });
  }
};
