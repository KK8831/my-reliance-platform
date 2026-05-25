exports.spin = async (req, res, next) => {
  try {
    const prizes    = [0, 0, 10, 0, 50, 0, 100, 0]
    const result    = prizes[Math.floor(Math.random() * prizes.length)]
    res.json({ success: true, prize: result, message: result > 0 ? `You won ₹${result}!` : 'Better luck next time!' })
  } catch (err) { next(err) }
}