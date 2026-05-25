import { useNavigate } from 'react-router-dom'
import './TopBar.css'

export default function TopBar({ title, showBack = true, transparent = false }) {
  const navigate = useNavigate()
  return (
    <div className={`top-bar ${transparent ? 'transparent' : ''}`}>
      {showBack && (
        <button className="back-btn" onClick={() => navigate(-1)}>‹</button>
      )}
      <h2 className="top-bar-title">{title}</h2>
    </div>
  )
}