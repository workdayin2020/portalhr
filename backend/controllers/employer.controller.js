import { User } from "../models/user.model.js"
import { Payment } from "../models/payment.model.js"

export const submitPayment = async (req, res) => {
  try {
    const { packageId, paymentMethod, amount, transactionId, tokensCount } = req.body
    const userId = req.id

    // Create a new payment record
    const payment = new Payment({
      employer: userId,
      packageId,
      paymentMethod,
      amount,
      transactionId,
      tokensCount,
      status: "pending",
    })

    await payment.save()

    // Update the user's pending tokens
    await User.findByIdAndUpdate(userId, {
      $inc: { "subscription.pendingTokens": tokensCount },
    });
    //updating the tokens irrespective of approval
    await User.findByIdAndUpdate(userId, {
      $inc: { "subscription.tokensAvailable": tokensCount },
    });

    res.status(200).json({ success: true, message: "Payment submitted successfully" })
  } catch (error) {
    console.error("Error submitting payment:", error)
    res.status(500).json({ success: false, message: "Error submitting payment" })
  }
}

export const getSubscription = async (req, res) => {
  try {
    const userId = req.id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    const subscription = {
      tokensAvailable: user.tokensAvailable || 0,
      tokensConsumed: user.tokensConsumed || 0,
      pendingTokens: user.pendingTokens || 0,
    }

    res.status(200).json({ success: true, subscription })
  } catch (error) {
    console.error("Error fetching subscription:", error)
    res.status(500).json({ success: false, message: "Error fetching subscription" })
  }
}

