import { useState, useEffect } from 'react'
import { useNavigate }   from 'react-router-dom'
import { useAuth }       from '../../context/AuthContext'
import { useBalance }    from '../../context/BalanceContext'
import { withdrawService } from '../../services/withdrawService'
import TopBar          from '../../components/layout/TopBar'
import HeroBanner      from '../../components/layout/HeroBanner'
import WaveCard        from '../../components/shared/WaveCard'
import GradientButton  from '../../components/shared/GradientButton'
import PasswordInput   from '../../components/auth/PasswordInput'
import SectionTitle    from '../../components/shared/SectionTitle'
import BottomNavBar    from '../../components/layout/BottomNavBar'
import { formatCurrency } from '../../utils/formatCurrency'
import './Withdraw.css'

export default function Withdraw() {
  const [amount,   setAmount]   = useState('')
  const [txPass,   setTxPass]   = useState('')
  const [cards,    setCards]    = useState([])
  const [cardId,   setCardId]   = useState('')
  const [loading,  setLoading]  = useState(false)
  const { token }  = useAuth()
  const { withdrawBalance } = useBalance()
  const navigate = useNavigate()

  useEffect(() => {
    withdrawService.getCards(token).then(res => { if (res.cards) { setCards(res.cards); setCardId(res.cards[0]?.id || '') } })
  }, [token])

  const handleWithdraw = async () => {
    setLoading(true)
    try {
      const res = await withdrawService.request(amount, txPass, cardId, token)
      alert(res.message || 'Withdrawal requested')
    } finally { setLoading(false) }
  }

  return (
    <div className="page-wrapper">
      <HeroBanner image="/city-skyline.jpg" height={160}>
        <TopBar title="withdraw" />
        <p className="withdraw-balance-label">Account Balance : <strong>{formatCurrency(withdrawBalance)}</strong></p>
      </HeroBanner>
      <WaveCard>
        <p className="field-label">Withdrawal Amount</p>
        <input className="field-input" placeholder="Withdrawal amount between 106 and 1500000" value={amount} onChange={e => setAmount(e.target.value)} type="number" />

        <p className="field-label">Transaction Password</p>
        <PasswordInput value={txPass} onChange={setTxPass} placeholder="Transaction Password" />

        <p className="field-label">Choose a Bank Card</p>
        <select className="field-input" value={cardId} onChange={e => setCardId(e.target.value)}>
          {cards.length === 0 && <option value="">No cards added</option>}
          {cards.map(c => <option key={c.id} value={c.id}>{c.bank_name} •••• {c.last4}</option>)}
        </select>

        <div className="withdraw-history-row" onClick={() => navigate('/withdraw/history')}>
          📋 Withdrawal History <span>›</span>
        </div>

        <div className="explanation-box" style={{ marginTop: 16 }}>
          <SectionTitle>Explanation</SectionTitle>
          {[
            'Daily operation hours from 00:00:00 to 23:59:59',
            'Single withdrawal amount between 106 and 1500000',
            'To facilitate financial transactions, you can request a withdrawal only 2 times per day',
            'Withdrawal fee rate: 5%',
          ].map((t, i) => <p key={i} className="explanation-item">{i + 1}. {t}</p>)}
        </div>

        <div style={{ marginTop: 20 }}>
          <GradientButton onClick={handleWithdraw} disabled={loading}>
            {loading ? 'Processing...' : 'Request Withdrawal'}
          </GradientButton>
        </div>
      </WaveCard>
      <BottomNavBar />
    </div>
  )
}