const User           = require('../models/User')
const Transaction    = require('../models/Transaction')
const paymentGateway = require('../services/paymentGateway')
const { minDeposit, maxDeposit } = require('../config/env')

exports.deposit = async (req, res, next) => {
  try {
    const { amount, channel } = req.body
    if (amount < minDeposit || amount > maxDeposit)
      return res.status(400).json({ message: `Amount must be between ₹${minDeposit} and ₹${maxDeposit}` })

    const payment = await paymentGateway.initiateDeposit({ amount, channel, userId: req.user._id })
    if (!payment.success) return res.status(400).json({ message: payment.error || 'Payment initiation failed' })

    const tx = await Transaction.create({
      user_id:         req.user._id,
      type:            'recharge',
      amount,
      fee_amount:      0,
      net_amount:      amount,
      payment_channel: channel,
      status:          'pending',
      reference_id:    payment.reference_id,
    })

    // We DO NOT auto-credit here anymore. The webhook handles it.

    // Return the Razorpay order_id and key to the frontend so it can open the checkout modal
    res.json({ 
      success: true, 
      message: 'Order created', 
      order_id: payment.reference_id,
      key_id: process.env.RAZORPAY_KEY_ID
    })
  } catch (err) { next(err) }
}

exports.webhook = async (req, res, next) => {
  try {
    const crypto = require('crypto')
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET

    // Razorpay sends the signature in this header
    const signature = req.headers['x-razorpay-signature']

    // Verify signature
    const body = JSON.stringify(req.body)
    const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex')

    if (expectedSignature !== signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' })
    }

    // Process the event
    const event = req.body.event
    if (event === 'payment.captured') {
      const paymentData = req.body.payload.payment.entity
      const orderId = paymentData.order_id

      // Find the pending transaction
      const tx = await Transaction.findOne({ reference_id: orderId, status: 'pending' })
      if (tx) {
        // Mark transaction as success and credit the user
        tx.status = 'success'
        await tx.save()
        await User.findByIdAndUpdate(tx.user_id, { $inc: { recharge_balance: tx.amount } })
      }
    }

    res.json({ status: 'ok' })
  } catch (err) {
    console.error('Webhook error:', err)
    res.status(500).json({ status: 'error' })
  }
}

exports.getHistory = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user_id: req.user._id, type: 'recharge' }).sort({ createdAt: -1 })
    res.json({ transactions })
  } catch (err) { next(err) }
}