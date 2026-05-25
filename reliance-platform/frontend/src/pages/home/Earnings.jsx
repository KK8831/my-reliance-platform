import { useBalance } from '../../context/BalanceContext'
import TopBar from '../../components/layout/TopBar'
import HeroBanner from '../../components/layout/HeroBanner'
import WaveCard from '../../components/shared/WaveCard'
import BottomNavBar from '../../components/layout/BottomNavBar'
import { formatCurrency } from '../../utils/formatCurrency'
import './Earnings.css'

export default function Earnings() {
  const { productIncome } = useBalance()

  return (
    <div className="page-wrapper">
      <HeroBanner image="/city-skyline.jpg" height={160}>
        <TopBar title="My Earnings" transparent={true} />
        <div className="earnings-header">
          <p className="earnings-label">Total Accumulated Earnings</p>
          <h2 className="earnings-amount">{formatCurrency(productIncome)}</h2>
        </div>
      </HeroBanner>

      <WaveCard>
        <div className="earnings-dashboard">
          <div className="earnings-stat-box primary">
            <div className="stat-icon">💰</div>
            <div className="stat-details">
              <p>Today's Product Income</p>
              <h4>{formatCurrency(productIncome)}</h4>
            </div>
          </div>
          
          <div className="earnings-stat-box secondary">
            <div className="stat-icon">📈</div>
            <div className="stat-details">
              <p>Active Plans</p>
              <h4>Running</h4>
            </div>
          </div>

          <div className="earnings-history-section">
            <h3 className="section-title">Recent Activity</h3>
            <div className="history-empty">
              <span className="empty-icon">📊</span>
              <p>Keep investing to see your daily earnings grow over time.</p>
            </div>
          </div>
        </div>
      </WaveCard>
      
      <BottomNavBar />
    </div>
  )
}
