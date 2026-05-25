import './FeatureCard.css'

export default function DailySignInCard({ onSignIn, onRecord }) {
  return (
    <div className="feature-card signin">
      <div className="feature-info">
        <h4>Sign in to receive rewards</h4>
        <p>Daily check-in can receive ₹0.00</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="feature-btn blue" onClick={onSignIn}>Sign in now</button>
          <button className="feature-btn green" onClick={onRecord}>Sign In Record</button>
        </div>
      </div>
    </div>
  )
}