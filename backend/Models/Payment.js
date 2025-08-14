import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["stripe", "mpesa", "paystack"], required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    reference: { type: String, required: true, unique: true },
    metadata: { type: Object },
    transactionId: { type: String },
  },
  { timestamps: true }
); 

export default mongoose.model("Payment", paymentSchema);


