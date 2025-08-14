import express from "express";
import { 
  createStripePayment, 
  createMpesaPayment, 
  createPaystackPayment,
  verifyPaystackPayment,
  getPaymentById, 
  getUserPayments 
} from "../Controllers/paymentController.js";
import { authenticateToken } from "../Middleware/auth.js"; // Ensures all payments are tied to a logged in user

const router = express.Router();

// All payment routes require login
router.use(authenticateToken);

router.post("/stripe", createStripePayment);    // Pay with Stripe
router.post("/mpesa", createMpesaPayment);      // Pay with M-Pesa
router.post("/paystack", createPaystackPayment); // Pay wwith Paystack
router.post("/paystack/verify", verifyPaystackPayment); // verify Paystack payment
router.get("/:id", getPaymentById);             // View specific payment, get a specific payment record
router.get("/", getUserPayments);               // View current user's payments, get all payments for the current user

export default router;
