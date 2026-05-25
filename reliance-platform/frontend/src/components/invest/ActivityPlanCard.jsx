import { formatCurrency } from '../../utils/formatCurrency'
import './PlanCard.css'

export default function ActivityPlanCard({ plan, onBuy }) {
  return (
    <div className="plan-card">
      <div className="plan-badge">{plan.badge}</div>
      <div className="plan-info">
        <h4 className="plan-name">{plan.name}</h4>
        <div className="plan-stats-grid">
           <div className="plan-stat">
             <span className="stat-label">Hourly Earnings</span>
             <span className="stat-val red">{formatCurrency(plan.hourlyEarnings)}</span>
           </div>
           <div className="plan-stat">
             <span className="stat-label">Revenue Hours</span>
             <span className="stat-val blue">{plan.revenueHours} Hours</span>
           </div>
           <div className="plan-stat full-width">
             <span className="stat-label">Total Income</span>
             <span className="stat-val red">{formatCurrency(plan.totalIncome)}</span>
           </div>
        </div>
      </div>
      <div className="plan-footer">
        <span className="plan-price">{formatCurrency(plan.price)}</span>
        <button className="plan-buy-btn" onClick={() => onBuy(plan)}>Buy</button>
      </div>
    </div>
  )
}