import { useNavigate } from 'react-router-dom'
import './FeatureCard.css'

export default function LuckyDrawCard() {
  const navigate = useNavigate()
  return (
    <div className="feature-card lucky">
      <div className="feature-info">
        <h4>Lucky Draw</h4>
        <p>Each purchase of a product will give you a different number of chances to win a prize.</p>
        <button className="feature-btn gold" onClick={() => navigate('/lucky-draw')}>Go to →</button>
      </div>
      <div className="feature-icon-fallback">🎁</div>
    </div>
  )
}