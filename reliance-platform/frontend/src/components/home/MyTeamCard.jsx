import { useNavigate } from 'react-router-dom'
import './FeatureCard.css'

export default function MyTeamCard() {
  const navigate = useNavigate()
  return (
    <div className="feature-card team">
      <div className="feature-info">
        <h4>My Team</h4>
        <p>Build your team and earn more money</p>
        <button className="feature-btn blue" onClick={() => navigate('/team')}>Go to →</button>
      </div>
      <div className="feature-icon-fallback">👥</div>
    </div>
  )
}