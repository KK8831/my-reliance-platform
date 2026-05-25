import { useEffect, useState } from 'react'
import { useAuth }    from '../../context/AuthContext'
import { userService } from '../../services/userService'
import { useBalance }  from '../../context/BalanceContext'
import HeroBanner       from '../../components/layout/HeroBanner'
import WaveCard         from '../../components/shared/WaveCard'
import BottomNavBar     from '../../components/layout/BottomNavBar'
import QuickActionIcons from '../../components/home/QuickActionIcons'
import PromoLinkCard    from '../../components/home/PromoLinkCard'
import LuckyDrawCard    from '../../components/home/LuckyDrawCard'
import MyTeamCard       from '../../components/home/MyTeamCard'
import TaskRewardsCard  from '../../components/home/TaskRewardsCard'
import DailySignInCard  from '../../components/home/DailySignInCard'
import ServiceCard      from '../../components/home/ServiceCard'
import CustomerServiceBtn from '../../components/shared/CustomerServiceBtn'
import './Home.css'

export default function Home() {
  const { token, user } = useAuth()
  const { updateBalances } = useBalance()
  const [inviteLink, setInviteLink] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  useEffect(() => {
    userService.getProfile(token).then(res => {
      if (res.user) {
        updateBalances({ recharge: res.user.recharge_balance, withdraw: res.user.withdraw_balance, product: res.user.product_income })
        setInviteCode(res.user.invitation_code)
        setInviteLink(`${window.location.origin}/?invitation_code=${res.user.invitation_code}`)
      }
    })
  }, [token])

  const handleCopy = () => { navigator.clipboard.writeText(inviteLink); alert('Link copied!') }

  return (
    <div className="page-wrapper">
      <HeroBanner image="/workers-sunset.jpg" height={220}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 12, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          Reliance Platform
        </div>
        <p className="home-tagline">Reliance Industries' mission is to create the ultimate products for consumers.</p>
      </HeroBanner>

      <WaveCard>
        <QuickActionIcons />
        <ServiceCard />
        <PromoLinkCard link={inviteLink} code={inviteCode} onCopy={handleCopy} />
        <LuckyDrawCard />
        <MyTeamCard />
        <TaskRewardsCard />
        <DailySignInCard />
      </WaveCard>

      <CustomerServiceBtn />
      <BottomNavBar />
    </div>
  )
}