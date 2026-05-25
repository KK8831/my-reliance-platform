require('dotenv').config()
const express  = require('express')
const cors     = require('cors')
const mongoose = require('mongoose')

const authRoutes     = require('./src/routes/authRoutes')
const userRoutes     = require('./src/routes/userRoutes')
const productRoutes  = require('./src/routes/productRoutes')
const rechargeRoutes = require('./src/routes/rechargeRoutes')
const withdrawRoutes = require('./src/routes/withdrawRoutes')
const teamRoutes     = require('./src/routes/teamRoutes')
const vipRoutes      = require('./src/routes/vipRoutes')
const noticeRoutes   = require('./src/routes/noticeRoutes')
const signInRoutes   = require('./src/routes/signInRoutes')
const errorHandler   = require('./src/middleware/errorHandler')

require('./src/jobs/dailyEarningsCron')
require('./src/jobs/hourlyEarningsCron')
require('./src/jobs/dailyWageCron')
require('./src/jobs/signInResetCron')

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())

app.use('/api/auth',     authRoutes)
app.use('/api/user',     userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/recharge', rechargeRoutes)
app.use('/api/withdraw', withdrawRoutes)
app.use('/api/team',     teamRoutes)
app.use('/api/vip',      vipRoutes)
app.use('/api/notice',   noticeRoutes)
app.use('/api/signin',   signInRoutes)

app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
  })
  .catch(err => { console.error('DB connection failed:', err); process.exit(1) })