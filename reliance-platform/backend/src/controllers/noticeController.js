const Notice = require('../models/Notice')

exports.getAll = async (req, res, next) => {
  try {
    const notices = await Notice.find({ is_active: true }).sort({ createdAt: -1 })
    res.json({ notices })
  } catch (err) { next(err) }
}

exports.getOne = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id)
    if (!notice) return res.status(404).json({ message: 'Notice not found' })
    res.json({ notice })
  } catch (err) { next(err) }
}