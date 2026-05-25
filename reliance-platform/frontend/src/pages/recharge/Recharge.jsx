import { useState } from 'react'
import { useAuth }  from '../../context/AuthContext'
import { rechargeService } from '../../services/rechargeService'
import TopBar                 from '../../components/layout/TopBar'
import HeroBanner             from '../../components/layout/HeroBanner'
import WaveCard               from '../../components/shared/WaveCard'
import GradientButton         from '../../components/shared/GradientButton'
import QuickAmountSelector    from '../../components/recharge/QuickAmountSelector'
import PaymentChannelSelector from '../../components/recharge/PaymentChannelSelector'
import SectionTitle           from '../../components/shared/SectionTitle'
import BottomNavBar           from '../../components/layout/BottomNavBar'
import './Recharge.css'

export default function Recharge() {
  const [amount,   setAmount]   = useState('')
  const [quick,    setQuick]    = useState(290)
  const [channel,  setChannel]  = useState('ptm')
  const [loading,  setLoading]  = useState(false)
  const { token } = useAuth()

  const handleDeposit = async () => {
    const finalAmount = amount || quick
    setLoading(true)
    try {
      const res = await rechargeService.deposit(finalAmount, channel, token)
      
      if (!res.success) {
        alert(res.message || 'Deposit failed')
        return
      }

      if (res.key_id === 'YOUR_RAZORPAY_KEY_ID') {
        alert("Payment gateway is currently in maintenance mode (Keys not configured). Please contact support.")
        return
      }

      const options = {
        key: res.key_id,
        amount: finalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Reliance Platform',
        description: 'Account Recharge',
        order_id: res.order_id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
            // Payment successful, backend webhook will verify signature and auto-credit
            alert("Payment successful! Your balance will be credited momentarily.")
            setAmount('')
        },
        theme: {
            color: '#E53935'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response){
          alert("Payment failed: " + response.error.description)
      })
      rzp.open()

    } catch (err) {
      console.error(err)
      alert('Network error or server is down.')
    } finally { setLoading(false) }
  }

  return (
    <div className="page-wrapper">
      <HeroBanner image="/city-skyline.jpg" height={140}>
        <TopBar title="recharge" />
      </HeroBanner>
      <WaveCard>
        <p className="recharge-label">Deposit Amount</p>
        <input
          className="recharge-input"
          placeholder="$ Deposit Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <p className="recharge-label">Quick Amounts</p>
        <QuickAmountSelector selected={quick} onChange={v => { setQuick(v); setAmount('') }} />
        <p className="recharge-label" style={{ marginTop: 16 }}>Channels</p>
        <PaymentChannelSelector selected={channel} onChange={setChannel} />
        <div className="explanation-box" style={{ marginTop: 20 }}>
          <SectionTitle>Explanation</SectionTitle>
          {[
            'Please do not modify the deposit amount. Unauthorized modification of the amount will result in the amount not being credited.',
            'Each deposit must be made through this page, please do not save payment information.',
            'The deposit amount for each transaction must be between ₹100 and ₹100000.',
            'The deposit amount will be credited within 5 minutes; if you do not receive it within this time frame, please contact online customer service.',
            'Due to the large number of users making deposits, please try multiple times to get the deposit link or try again later.',
          ].map((t, i) => <p key={i} className="explanation-item">{i + 1}. {t}</p>)}
        </div>
        <div style={{ marginTop: 20 }}>
          <GradientButton onClick={handleDeposit} disabled={loading}>
            {loading ? 'Processing...' : 'Deposit Now'}
          </GradientButton>
        </div>
      </WaveCard>
      <BottomNavBar />
    </div>
  )
}