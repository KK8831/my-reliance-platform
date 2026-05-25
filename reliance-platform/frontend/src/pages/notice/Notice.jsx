import { useEffect, useState } from 'react'
import { useAuth }  from '../../context/AuthContext'
import { noticeService } from '../../services/noticeService'
import TopBar        from '../../components/layout/TopBar'
import HeroBanner    from '../../components/layout/HeroBanner'
import WaveCard      from '../../components/shared/WaveCard'
import NoticeItem    from '../../components/shared/NoticeItem'
import BottomNavBar  from '../../components/layout/BottomNavBar'

const STATIC_NOTICES = [
  { id: 1, title: 'Lucky Roulette',     date: '2026-03-22T09:33:33', icon: '/assets/icons/vip-icon.svg' },
  { id: 2, title: 'Daily Login Rewards',date: '2026-03-22T09:32:30', icon: '/assets/icons/rewards-icon.svg' },
  { id: 3, title: 'Referral Rewards',   date: '2026-03-22T09:30:55', icon: '/assets/icons/team-icon.svg' },
  { id: 4, title: 'Recharge Rewards',   date: '2026-03-22T09:25:02', icon: '/assets/icons/recharge-icon.svg' },
]

export default function Notice() {
  const [notices, setNotices] = useState(STATIC_NOTICES)
  const { token } = useAuth()

  useEffect(() => {
    noticeService.getAll(token).then(res => { if (res.notices?.length) setNotices(res.notices) }).catch(() => {})
  }, [token])

  return (
    <div className="page-wrapper">
      <HeroBanner image="/city-skyline.jpg" height={140}>
        <TopBar title="Notice" transparent={true} />
      </HeroBanner>
      <WaveCard>
        {notices.map(n => <NoticeItem key={n._id || n.id} icon={n.icon} title={n.title} date={n.createdAt || n.date} />)}
      </WaveCard>
      <BottomNavBar />
    </div>
  )
}