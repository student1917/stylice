// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true, 
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["momo", "vnpay", "cash"],
    required: true,
  },
  requestId: {
    type: String,
    allowNull: true, 
    default: null,
  },
  transactionId: {
    type: String,
    trim: true
  },
    paymentTime: {
    type: Date
  },    
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
}, {
  timestamps: true
});

export default mongoose.model("Payment", paymentSchema);
