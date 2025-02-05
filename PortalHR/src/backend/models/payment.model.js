import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  packageId: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  tokensCount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Payment = mongoose.model("Payment", paymentSchema)

