const User       = require('../models/User')
const Transaction= require('../models/Transaction')
const BankCard   = require('../models/BankCard')
const calcFee    = require('../utils/withdrawFeeCalculator')
const { minWithdrawal, maxWithdrawal } = require('../config/env')

exports.requestWithdrawal = async (req, res, next) => {
  try {
    const { amount, transaction_password, bank_card_id } = req.body

    if (amount < minWithdrawal || amount > maxWithdrawal)
      return res.status(400).json({ message: `Amount must be between ₹${minWithdrawal} and ₹${maxWithdrawal}` })

    const user = await User.findById(req.user._id)

    const txMatch = await user.compareTxPassword(transaction_password)
    if (!txMatch) return res.status(401).json({ message: 'Invalid transaction password' })

    if (user.withdraw_balance < amount)
      return res.status(400).json({ message: 'Insufficient withdraw balance' })

    const card = await BankCard.findOne({ _id: bank_card_id, user_id: user._id, is_active: true })
    if (!card) return res.status(404).json({ message: 'Bank card not found' })

    const { fee, net } = calcFee(amount)

    await User.findByIdAndUpdate(user._id, { $inc: { withdraw_balance: -amount } })

    await Transaction.create({
      user_id:      user._id,
      type:         'withdraw',
      amount,
      fee_amount:   fee,
      net_amount:   net,
      bank_card_id: card._id,
      status:       'pending',
      note:         `Withdrawal to ${card.bank_name} •••• ${card.account_number.slice(-4)}`,
    })

    res.json({ success: true, message: 'Withdrawal request submitted. Processing within 24 hours.' })
  } catch (err) { next(err) }
}

exports.getHistory = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user_id: req.user._id, type: 'withdraw' })
      .populate('bank_card_id')
      .sort({ createdAt: -1 })
    res.json({ transactions })
  } catch (err) { next(err) }
}

exports.addBankCard = async (req, res, next) => {
  try {
    const { bank_name, holder_name, account_name, account_number, ifsc_code, upi_id } = req.body
    const finalAccountName = holder_name || account_name
    const card = await BankCard.create({ user_id: req.user._id, bank_name, account_name: finalAccountName, account_number, ifsc_code, upi_id })
    res.status(201).json({ success: true, card })
  } catch (err) { next(err) }
}

exports.getBankCards = async (req, res, next) => {
  try {
    const cards = await BankCard.find({ user_id: req.user._id, is_active: true })
    res.json({ cards })
  } catch (err) { next(err) }
}