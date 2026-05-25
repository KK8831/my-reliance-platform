import { VIP_LEVELS } from '../../constants/vipLevels'
import { useVip }     from '../../context/VipContext'
import TopBar         from '../../components/layout/TopBar'
import HeroBanner     from '../../components/layout/HeroBanner'
import WaveCard       from '../../components/shared/WaveCard'
import { formatCurrency } from '../../utils/formatCurrency'
import './VipLevel.css'

export default function VipLevel() {
  const { vipLevel, totalInvested } = useVip()

  return (
    <div className="page-wrapper">
      <HeroBanner image="/city-skyline.jpg" height={150}>
        <TopBar title="Vip Level" />
        <div className="vip-hero-badge">👑</div>
      </HeroBanner>
      <WaveCard>
        {VIP_LEVELS.map(v => (
          <div key={v.level} className={`vip-card ${vipLevel === v.level ? 'current' : ''}`}>
            <div className="vip-card-header">
              <div className="vip-badge-icon">{['🌱','🥉','🥈','🥇','💎','👑','🏆','⭐'][v.level] || '🌱'}</div>
              <span className="vip-label">{v.label}</span>
            </div>
            <div className="vip-card-body">
              <p className="vip-desc">
                When the investment amount reaches {formatCurrency(v.minInvestment)}, you can upgrade to VIP{v.level} level.
              </p>
              <div className="vip-progress-row">
                <span className="vip-progress-text">Total investment amount</span>
                <span className="vip-progress-val">{v.level === 0 ? totalInvested : 0} / {v.minInvestment.toFixed(2)}</span>
              </div>
              <div className="vip-progress-bar">
                <div
                  className="vip-progress-fill"
                  style={{ width: `${v.level === 0 ? 100 : Math.min((totalInvested / v.minInvestment) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </WaveCard>
    </div>
  )
}