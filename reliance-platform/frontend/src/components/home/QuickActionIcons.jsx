import { useNavigate } from 'react-router-dom'
import './QuickActionIcons.css'

const ACTIONS = [
  { label: 'Recharge', icon: '👛', path: '/recharge' },
  { label: 'Withdraw', icon: '💳', path: '/withdraw' },
  { label: 'VIP',      icon: '💎', path: '/vip'      },
  { label: 'Blog',     icon: '💬', path: '/notice'   },
]

export default function QuickActionIcons() {
  const navigate = useNavigate()
  return (
    <div className="quick-actions">
      {ACTIONS.map(a => (
        <button key={a.label} className="quick-action-btn" onClick={() => navigate(a.path)}>
          <div className="quick-icon">{a.icon}</div>
          <span>{a.label}</span>
        </button>
      ))}
    </div>
  )
}