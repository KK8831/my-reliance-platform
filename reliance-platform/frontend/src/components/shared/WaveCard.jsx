import './WaveCard.css'

export default function WaveCard({ children }) {
  return (
    <div className="wave-card">
      <div className="wave-top" />
      <div className="wave-content">{children}</div>
    </div>
  )
}