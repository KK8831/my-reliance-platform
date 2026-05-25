import './HeroBanner.css'

export default function HeroBanner({ image, height = 220, children }) {
  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${image})`, height }}>
      <div className="hero-overlay" />
      <div className="hero-content">{children}</div>
    </div>
  )
}