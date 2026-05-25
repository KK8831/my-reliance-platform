import { useNavigate } from 'react-router-dom'
import { useAuth }   from '../../context/AuthContext'
import { useBalance } from '../../context/BalanceContext'
import { useVip }    from '../../context/VipContext'
import { maskPhoneNumber } from '../../utils/maskPhoneNumber'
import { formatCurrency }  from '../../utils/formatCurrency'
import HeroBanner    from '../../components/layout/HeroBanner'
import BottomNavBar  from '../../components/layout/BottomNavBar'
import './My.css'

const MY_COMPANY = [
  { label: 'Team',    icon: '👥', path: '/team'       },
  { label: 'Balance', icon: '💰', path: '/my/balance'  },
  { label: 'Rewards', icon: '🎁', path: '/my/rewards'  },
]

const OTHER_SERVICES = [
  { label: 'VIP',      icon: '👑', path: '/vip'      },
  { label: 'Help',     icon: '🎧', path: '#'          },
  { label: 'About Us', icon: '🏢', path: '#'          },
  { label: 'Telegram', icon: '✈️', path: '#'          },
  { label: 'Settings', icon: '⚙️', path: '#'          },
]

export default function My() {
  const { user, logout }  = useAuth()
  const { rechargeBalance, withdrawBalance, productIncome } = useBalance()
  const { vipLevel, nextLevel, progress } = useVip()
  const navigate = useNavigate()

  return (
    <div className="page-wrapper">
      <HeroBanner image="/city-skyline.jpg" height={160}>
        <div className="my-avatar-fallback">
          {(user?.nickname || 'U').charAt(0).toUpperCase()}
        </div>
        <p className="my-name">{user?.nickname || 'User'}</p>
        <p className="my-id">ID {maskPhoneNumber(user?.phone || '0000000000')} ({user?.id || '000000'})</p>
      </HeroBanner>

      <div className="my-body">
        <div className="balance-card">
          <div className="balance-row">
            <div><p className="bal-val">{formatCurrency(rechargeBalance)}</p><p className="bal-label">Recharge Balance</p></div>
            <div><p className="bal-val">{formatCurrency(withdrawBalance)}</p><p className="bal-label">Withdraw Balance</p></div>
          </div>
          <p className="bal-label" style={{ marginTop: 8 }}>Product income :</p>
          <p className="bal-val blue">{formatCurrency(productIncome)}</p>
          <div className="my-quick-actions">
            {[{l:'Recharge',p:'/recharge'},{l:'Withdraw',p:'/withdraw'},{l:'Orders',p:'/my/orders'},{l:'Card Wallet',p:'/my/card-wallet'}].map(a => (
              <button key={a.l} className="my-action-btn" onClick={() => navigate(a.p)}>
                <div className="my-action-icon">💳</div>
                <span>{a.l}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="vip-banner" onClick={() => navigate('/vip')}>
          <div>
            <p className="vip-banner-label">👑 VIP Level <span className="vip-badge-pill">VIP {vipLevel}</span></p>
            <p className="vip-banner-sub">Upgrade to VIP{vipLevel + 1}, still need {nextLevel?.minInvestment || 0}</p>
            <div className="vip-mini-bar"><div className="vip-mini-fill" style={{ width: `${progress}%` }} /></div>
            <p className="vip-upgrade-link">Methods to Upgrade VIP</p>
          </div>
          <div className="vip-banner-badge">{['🌱','🥉','🥈','🥇','💎','👑','🏆','⭐'][vipLevel] || '🌱'}</div>
        </div>

        <div className="my-section">
          <p className="my-section-title">My Company</p>
          <div className="my-icon-row">
            {MY_COMPANY.map(s => (
              <button key={s.label} className="my-icon-btn" onClick={() => navigate(s.path)}>
                <div className="my-icon">{s.icon}</div>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="my-section">
          <p className="my-section-title">Other Services</p>
          <div className="my-icon-row">
            {OTHER_SERVICES.map(s => (
              <button key={s.label} className="my-icon-btn" onClick={() => navigate(s.path)}>
                <div className="my-icon">{s.icon}</div>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar />
    </div>
  )
}