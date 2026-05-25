import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { teamService } from '../../services/teamService'
import TopBar from '../../components/layout/TopBar'
import HeroBanner from '../../components/layout/HeroBanner'
import WaveCard from '../../components/shared/WaveCard'
import BottomNavBar from '../../components/layout/BottomNavBar'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

export default function Rewards() {
  const [commissions, setCommissions] = useState([])
  const [total, setTotal]             = useState(0)
  const [loading, setLoading]         = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    teamService.getCommissions(token)
      .then(res => {
        if (res.commissions) setCommissions(res.commissions)
        if (res.total)       setTotal(res.total)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div className="page-wrapper">
      <HeroBanner image="/workers-sunset.jpg" height={160}>
        <TopBar title="Referral Rewards" />
        <div style={{ textAlign:'center', marginTop:8 }}>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:13, margin:'0 0 4px' }}>Total Rewards</p>
          <p style={{ color:'#fff', fontSize:32, fontWeight:800, margin:0 }}>{formatCurrency(total)}</p>
        </div>
      </HeroBanner>
      <WaveCard>
        <div style={{
          background:'linear-gradient(135deg, #fff8e1, #fff3e0)', borderRadius:14,
          padding:16, marginBottom:16, display:'flex', alignItems:'center', gap:12
        }}>
          <span style={{ fontSize:32 }}>🎁</span>
          <div>
            <p style={{ fontWeight:700, fontSize:14, margin:'0 0 3px' }}>Referral Commission</p>
            <p style={{ fontSize:12, color:'#757575', margin:0, lineHeight:1.5 }}>
              Earn commissions when your referrals invest. Level 1: 20% • Level 2: 5% • Level 3: 3%
            </p>
          </div>
        </div>

        {loading && <p style={{ textAlign:'center', padding:32, color:'#999' }}>Loading...</p>}
        {!loading && commissions.length === 0 && (
          <div style={{ textAlign:'center', padding:40 }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🤝</div>
            <p style={{ color:'#999' }}>No rewards yet</p>
            <p style={{ color:'#bbb', fontSize:13 }}>Invite friends to earn commissions</p>
          </div>
        )}
        {commissions.map((item, i) => (
          <div key={item._id || i} style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'12px 0', borderBottom:'1px solid #f5f5f5'
          }}>
            <div>
              <p style={{ fontWeight:600, fontSize:14, margin:'0 0 3px' }}>
                Lv{item.level} Commission
              </p>
              <p style={{ fontSize:12, color:'#999', margin:0 }}>{formatDate(item.createdAt)}</p>
            </div>
            <p style={{ fontWeight:700, fontSize:16, color:'#2E7D32', margin:0 }}>
              +{formatCurrency(item.amount)}
            </p>
          </div>
        ))}
      </WaveCard>
      <BottomNavBar />
    </div>
  )
}
