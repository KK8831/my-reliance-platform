import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { teamService } from '../../services/teamService'
import TopBar from '../../components/layout/TopBar'
import HeroBanner from '../../components/layout/HeroBanner'
import WaveCard from '../../components/shared/WaveCard'
import BottomNavBar from '../../components/layout/BottomNavBar'
import { formatCurrency } from '../../utils/formatCurrency'
import { maskPhoneNumber } from '../../utils/maskPhoneNumber'

export default function TeamDetails() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    teamService.getTeamDetails(token)
      .then(res => { if (res.members) setMembers(res.members) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div className="page-wrapper">
      <HeroBanner image="/workers-sunset.jpg" height={130}>
        <TopBar title="Team Details" />
      </HeroBanner>
      <WaveCard>
        {loading && <p style={{ textAlign: 'center', padding: 32, color: '#999' }}>Loading...</p>}
        {!loading && members.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>👥</div>
            <p style={{ color: '#999' }}>No team members yet</p>
            <p style={{ color: '#bbb', fontSize: 13 }}>Share your invite link to grow your team</p>
          </div>
        )}
        {members.map((m, i) => (
          <div key={m._id || i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 0', borderBottom: '1px solid #f5f5f5'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #E53935, #1A237E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0
              }}>
                {(m.nickname || 'U')[0].toUpperCase()}
              </div>
              <div>
                <p style={{ fontWeight: 600, margin: '0 0 2px', fontSize: 14 }}>{m.nickname || 'User'}</p>
                <p style={{ color: '#999', fontSize: 12, margin: 0 }}>{maskPhoneNumber(m.phone || '')}</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#E53935', margin: '0 0 2px' }}>
                {formatCurrency(m.total_invested || 0)}
              </p>
              <span style={{
                fontSize: 11, background: '#e8f5e9', color: '#2E7D32',
                padding: '2px 8px', borderRadius: 10, fontWeight: 600
              }}>
                Lv{m.level || 1}
              </span>
            </div>
          </div>
        ))}
      </WaveCard>
      <BottomNavBar />
    </div>
  )
}
