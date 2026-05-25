const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

module.exports = (length = 5) =>
  Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')