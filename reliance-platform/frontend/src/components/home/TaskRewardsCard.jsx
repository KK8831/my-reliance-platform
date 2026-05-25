import { useNavigate } from 'react-router-dom'
import './FeatureCard.css'

export default function TaskRewardsCard() {
  const navigate = useNavigate()
  return (
    <div className="feature-card task">
      <div className="feature-info">
        <h4>Task Rewards</h4>
        <p>Complete tasks and earn an extra salary every day</p>
        <button className="feature-btn green" onClick={() => navigate('/earnings')}>Go to →</button>
      </div>
    </div>
  )
}