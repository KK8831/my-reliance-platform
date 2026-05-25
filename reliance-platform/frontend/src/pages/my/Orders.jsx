import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { productService } from '../../services/productService'
import TopBar from '../../components/layout/TopBar'
import HeroBanner from '../../components/layout/HeroBanner'
import WaveCard from '../../components/shared/WaveCard'
import BottomNavBar from '../../components/layout/BottomNavBar'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const STATUS_COLOR = { active: '#1565C0', completed: '#2E7D32', pending: '#E65100' }
const STATUS_BG    = { active: '#e3f2fd', completed: '#e8f5e9', pending: '#fff3e0' }

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    productService.getOrders(token)
      .then(res => { if (res.orders) setOrders(res.orders) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div className="page-wrapper">
      <HeroBanner image="/oil-rig.jpg" height={130}>
        <TopBar title="My Orders" />
      </HeroBanner>
      <WaveCard>
        {loading && <p style={{ textAlign: 'center', padding: 32, color: '#999' }}>Loading...</p>}
        {!loading && orders.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
            <p style={{ color: '#999' }}>No orders yet</p>
            <p style={{ color: '#bbb', fontSize: 13 }}>Go to Invest to purchase products</p>
          </div>
        )}
        {orders.map((order, i) => (
          <div key={order._id || i} style={{
            background: '#fff', borderRadius: 14, padding: 14,
            marginBottom: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>
                  {order.product_name || 'Product'}
                </p>
                <p style={{ color: '#757575', fontSize: 12, margin: '0 0 6px' }}>
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 12,
                background: STATUS_BG[order.status] || '#f5f5f5',
                color: STATUS_COLOR[order.status] || '#555'
              }}>
                {order.status || 'active'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <div>
                <p style={{ fontSize: 11, color: '#999', margin: '0 0 2px' }}>Invested</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#E53935', margin: 0 }}>
                  {formatCurrency(order.amount || 0)}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, color: '#999', margin: '0 0 2px' }}>Daily Earnings</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#2E7D32', margin: 0 }}>
                  +{formatCurrency(order.daily_earnings || 0)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </WaveCard>
      <BottomNavBar />
    </div>
  )
}
