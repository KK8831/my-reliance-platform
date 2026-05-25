import './ServiceCard.css'

export default function ServiceCard({ onService, onTelegram }) {
  return (
    <div className="service-row">
      <button className="service-card orange" onClick={onService}>
        <span>🎧</span> Service →
      </button>
      <button className="service-card green" onClick={onTelegram}>
        <span>✈️</span> Telegram →
      </button>
    </div>
  )
}