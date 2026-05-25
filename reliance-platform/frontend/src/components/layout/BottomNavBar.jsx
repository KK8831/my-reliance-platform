import { NavLink } from 'react-router-dom'
import './BottomNavBar.css'

const TABS = [
  { path: '/',       label: 'Home',   icon: '🏠' },
  { path: '/invest', label: 'Invest', icon: '📊' },
  { path: '/notice', label: 'Notice', icon: '📋' },
  { path: '/team',   label: 'Team',   icon: '👥' },
  { path: '/my',     label: 'My',     icon: '👤' },
]

export default function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      {TABS.map(tab => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === '/'}
          className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}