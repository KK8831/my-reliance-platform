const { verify } = require('../utils/jwtHelper')
const User       = require('../models/User')

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthorized' })

    const token   = header.split(' ')[1]
    const decoded = verify(token)
    const user    = await User.findById(decoded.id).select('-password_hash -transaction_password_hash')
    if (!user || !user.is_active)
      return res.status(401).json({ message: 'Account not found or inactive' })

    req.user = user
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}