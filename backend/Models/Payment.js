import mongoose from 'mongoose';

// Defines the structure of a payment record in MongoDB. 
// Stores:
// Who made the payment (user)
// How it was made (method)
// How much (amount)
// What currency (currency)
// Whether it succeeded (status)
// Transaction ID (reference)
// Extra info like phone number or Stripe secret (meta)
const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //Assuming you have a User Model
        required: true
    },
    method: {
        type: String,
        enum: ['stripe', 'mpesa'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ['KES', 'USD', 'EUR'],
        default: 'KES'
    },
    status: {
        type: String,
        enum: [ 'pending', 'completed', 'failed' ],
        default: 'pending'
    },
    reference: {
        type: String,
        required: true
    },
    meta: {
        type: Object, // Store any extra details (receipt, phone number, etc)
        default: {}
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
