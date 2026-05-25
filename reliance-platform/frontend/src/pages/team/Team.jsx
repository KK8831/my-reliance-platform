import { useEffect, useState } from 'react'
import { useAuth }  from '../../context/AuthContext'
import { teamService } from '../../services/teamService'
import { COMMISSION_RATES } from '../../constants/commissionRates'
import HeroBanner   from '../../components/layout/HeroBanner'
import WaveCard     from '../../components/shared/WaveCard'
import BottomNavBar from '../../components/layout/BottomNavBar'
import PromoLinkCard from '../../components/home/PromoLinkCard'
import { formatCurrency } from '../../utils/formatCurrency'
import './Team.css'

export default function Team() {
  const [teamData, setTeamData] = useState({ size: 0, referralAmount: 0, inviteLink: '', levels: [] })
  const { token, user } = useAuth()

  useEffect(() => {
    teamService.getTeam(token).then(res => { if (res.team) setTeamData(res.team) }).catch(() => {})
  }, [token])

  const handleCopy = () => { navigator.clipboard.writeText(teamData.inviteLink || ''); alert('Link copied!') }

  return (
    <div className="page-wrapper">
      <HeroBanner image="/workers-sunset.jpg" height={160}>
        <div className="invite-banner">🤝 INVITE FRIENDS</div>
      </HeroBanner>
      <WaveCard>
        <div className="team-stats">
          <div className="stat-box"><p className="stat-val">{teamData.size}</p><p className="stat-label">Team Size</p></div>
          <div className="stat-box green"><p className="stat-val">{formatCurrency(teamData.referralAmount)}</p><p className="stat-label">Referral Amount</p></div>
        </div>
        <div style={{ margin: '15px 0' }}>
          <PromoLinkCard 
            link={teamData.inviteLink || `${window.location.origin}/?invitation_code=${user?.invitation_code}`} 
            code={user?.invitation_code} 
            onCopy={handleCopy} 
          />
        </div>
        <div className="team-level-header">
          <strong>Team Level</strong>
          <span className="team-details-link">Team Details &gt;</span>
        </div>
        {COMMISSION_RATES.map(r => (
          <div key={r.level} className="level-row">
            <div className="lv-badge">lv{r.level}</div>
            <div className="lv-info"><p className="lv-rate">{r.label}</p><p className="lv-desc">Commission Percentage</p></div>
            <div className="lv-info"><p className="lv-rate">0 / 0</p><p className="lv-desc">Registered/Valid</p></div>
            <div className="lv-info"><p className="lv-rate">₹0</p><p className="lv-desc">Total Revenue</p></div>
          </div>
        ))}
      </WaveCard>
      <BottomNavBar />
    </div>
  )
}