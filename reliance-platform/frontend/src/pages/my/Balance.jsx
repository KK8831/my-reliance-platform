import { useBalance } from '../../context/BalanceContext'
import { useAuth } from '../../context/AuthContext'
import TopBar from '../../components/layout/TopBar'
import HeroBanner from '../../components/layout/HeroBanner'
import WaveCard from '../../components/shared/WaveCard'
import BottomNavBar from '../../components/layout/BottomNavBar'
import { formatCurrency } from '../../utils/formatCurrency'
import { useNavigate } from 'react-router-dom'

export default function Balance() {
  const { rechargeBalance, withdrawBalance, productIncome } = useBalance()
  const { user } = useAuth()
  const navigate = useNavigate()

  const cards = [
    { label: 'Recharge Balance', value: rechargeBalance, icon: '💰', color: '#1565C0', bg: '#e3f2fd', action: () => navigate('/recharge'), actionLabel: 'Recharge' },
    { label: 'Withdraw Balance', value: withdrawBalance, icon: '💳', color: '#2E7D32', bg: '#e8f5e9', action: () => navigate('/withdraw'), actionLabel: 'Withdraw' },
    { label: 'Product Income',   value: productIncome,   icon: '📊', color: '#E65100', bg: '#fff3e0', action: () => navigate('/invest'),  actionLabel: 'Invest' },
  ]

  const total = rechargeBalance + withdrawBalance + productIncome

  return (
    <div className="page-wrapper">
      <HeroBanner image="/city-skyline.jpg" height={160}>
        <TopBar title="My Balance" />
        <div style={{ textAlign:'center', marginTop:8 }}>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:13, margin:'0 0 4px' }}>Total Assets</p>
          <p style={{ color:'#fff', fontSize:32, fontWeight:800, margin:0 }}>{formatCurrency(total)}</p>
        </div>
      </HeroBanner>
      <WaveCard>
        <p style={{ fontSize:13, color:'#757575', fontWeight:600, marginBottom:12 }}>Balance Breakdown</p>
        {cards.map(card => (
          <div key={card.label} style={{
            background: card.bg, borderRadius:16, padding:'16px', marginBottom:12,
            display:'flex', justifyContent:'space-between', alignItems:'center'
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{
                width:48, height:48, borderRadius:12, background:'#fff',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:22
              }}>{card.icon}</div>
              <div>
                <p style={{ fontSize:12, color:'#757575', margin:'0 0 3px', fontWeight:600 }}>{card.label}</p>
                <p style={{ fontSize:20, fontWeight:800, color:card.color, margin:0 }}>{formatCurrency(card.value)}</p>
              </div>
            </div>
            <button onClick={card.action} style={{
              background: card.color, color:'#fff', border:'none', borderRadius:20,
              padding:'8px 16px', fontSize:12, fontWeight:700, cursor:'pointer'
            }}>{card.actionLabel}</button>
          </div>
        ))}

        <div style={{ marginTop:8, padding:'16px', background:'#fafafa', borderRadius:14 }}>
          <p style={{ fontSize:13, fontWeight:700, color:'#212121', margin:'0 0 8px' }}>💡 How balances work</p>
          <p style={{ fontSize:12, color:'#757575', lineHeight:1.6, margin:0 }}>
            • <strong>Recharge Balance</strong>: Topped up via deposit. Used to buy products.<br/>
            • <strong>Withdraw Balance</strong>: Earnings ready to withdraw to your bank.<br/>
            • <strong>Product Income</strong>: Daily returns from active investments.
          </p>
        </div>
      </WaveCard>
      <BottomNavBar />
    </div>
  )
}
