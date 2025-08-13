import Payment from "../Models/Payment.js";

export const createPayment = async (req, res) => {
  const payment = await Payment.create({ ...req.body, user: req.user.id });
  res.status(201).json(payment);
};

export const getPayments = async (req, res) => {
  const payments = await Payment.find().populate("user booking");
  res.json(payments);
};

export const getPaymentById = async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate("user booking");
  if (!payment) return res.status(404).json({ error: "Payment not found" });
  res.json(payment);
};
