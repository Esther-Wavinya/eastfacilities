import express from "express";
import { 
  createStripePayment, 
  createMpesaPayment, 
  getPaymentById, 
  getUserPayments 
} from "../Controllers/paymentController.js";
import { authenticateToken } from "../Middleware/auth.js";

const router = express.Router();

// All payment routes require login
router.use(authenticateToken);

router.post("/stripe", createStripePayment);    // Pay with Stripe
router.post("/mpesa", createMpesaPayment);      // Pay with M-Pesa
router.get("/:id", getPaymentById);             // View specific payment
router.get("/", getUserPayments);               // View current user's payments

export default router;
