const Product            = require('../models/Product')
const Order              = require('../models/Order')
const User               = require('../models/User')
const Transaction        = require('../models/Transaction')
const commissionService  = require('../services/commissionService')
const vipUpgradeService  = require('../services/vipUpgradeService')
const referralService    = require('../services/referralService')

exports.getProducts = async (req, res, next) => {
  try {
    const { type } = req.query
    const query = { is_active: true }
    if (type) query.type = type
    const products = await Product.find(query).sort({ price: 1 })
    res.json({ products })
  } catch (err) { next(err) }
}

exports.buyProduct = async (req, res, next) => {
  try {
    const { product_id } = req.body
    const product = await Product.findById(product_id)
    if (!product || !product.is_active)
      return res.status(404).json({ message: 'Product not found' })

    if (req.user.vip_level < product.required_vip_level)
      return res.status(403).json({ message: `Requires VIP ${product.required_vip_level} or above` })

    if (req.user.recharge_balance < product.price)
      return res.status(400).json({ message: 'Insufficient recharge balance' })

    const endDate = new Date()
    endDate.setDate(endDate.getDate() + (product.revenue_days || 1))

    const order = await Order.create({
      user_id:            req.user._id,
      product_id:         product._id,
      amount_paid:        product.price,
      daily_earnings:     product.daily_earnings,
      hourly_earnings:    product.hourly_earnings,
      total_earned:       0,
      max_earnings_count: product.type === 'activity' ? 1 : product.revenue_days,
      start_date:         new Date(),
      end_date:           endDate,
      type:               product.type,
      status:             'active',
    })

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { recharge_balance: -product.price, total_invested: product.price },
    })

    await Transaction.create({
      user_id:    req.user._id,
      type:       'recharge',
      amount:     -product.price,
      fee_amount: 0,
      net_amount: -product.price,
      status:     'success',
      note:       `Purchased ${product.name}`,
    })

    await commissionService.distribute(req.user, order, product.price)
    await referralService.activateAndPay(req.user)
    await vipUpgradeService.checkAndUpgrade(req.user._id)

    res.json({ success: true, message: 'Product purchased successfully', order })
  } catch (err) { next(err) }
}

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user_id: req.user._id })
      .populate('product_id')
      .sort({ createdAt: -1 })
    res.json({ orders })
  } catch (err) { next(err) }
}