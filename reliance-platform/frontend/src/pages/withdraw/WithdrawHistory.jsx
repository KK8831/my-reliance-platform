import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { withdrawService } from '../../services/withdrawService'
import TopBar from '../../components/layout/TopBar'
import HeroBanner from '../../components/layout/HeroBanner'
import WaveCard from '../../components/shared/WaveCard'
import BottomNavBar from '../../components/layout/BottomNavBar'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const STATUS_COLOR = { pending: '#F57F17', approved: '#2E7D32', rejected: '#C62828' }
const STATUS_BG    = { pending: '#fff8e1', approved: '#e8f5e9', rejected: '#ffebee' }

export default function WithdrawHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    withdrawService.history(token)
      .then(res => { if (res.history) setHistory(res.history) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div className="page-wrapper">
      <HeroBanner image="/city-skyline.jpg" height={130}>
        <TopBar title="Withdrawal History" />
      </HeroBanner>
      <WaveCard>
        {loading && <p style={{ textAlign: 'center', padding: 32, color: '#999' }}>Loading...</p>}
        {!loading && history.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
            <p style={{ color: '#999' }}>No withdrawal history yet</p>
          </div>
        )}
        {history.map((item, i) => (
          <div key={item._id || i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 0', borderBottom: '1px solid #f5f5f5'
          }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 16, margin: '0 0 4px', color: '#212121' }}>
                {formatCurrency(item.amount)}
              </p>
              <p style={{ fontSize: 12, color: '#757575', margin: 0 }}>{formatDate(item.createdAt)}</p>
              <p style={{ fontSize: 11, color: '#999', margin: '2px 0 0' }}>Fee: {formatCurrency(item.fee || 0)}</p>
            </div>
            <span style={{
              fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 12,
              background: STATUS_BG[item.status] || '#f5f5f5',
              color: STATUS_COLOR[item.status] || '#555'
            }}>
              {item.status || 'pending'}
            </span>
          </div>
        ))}
      </WaveCard>
      <BottomNavBar />
    </div>
  )
}
