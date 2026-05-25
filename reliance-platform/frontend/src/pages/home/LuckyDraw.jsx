import { useState } from 'react'
import TopBar from '../../components/layout/TopBar'
import HeroBanner from '../../components/layout/HeroBanner'
import WaveCard from '../../components/shared/WaveCard'
import BottomNavBar from '../../components/layout/BottomNavBar'
import { formatCurrency } from '../../utils/formatCurrency'
import './LuckyDraw.css'

const COUPONS = [
  { id: 1, type: 'win', amount: 50 },
  { id: 2, type: 'lose', amount: 0 },
  { id: 3, type: 'win', amount: 20 },
  { id: 4, type: 'lose', amount: 0 },
  { id: 5, type: 'win', amount: 10 },
  { id: 6, type: 'lose', amount: 0 },
]

export default function LuckyDraw() {
  const [scratched, setScratched] = useState({})
  
  // Shuffle coupons on mount to make it feel random
  const [coupons] = useState(() => [...COUPONS].sort(() => Math.random() - 0.5))

  const handleScratch = (id) => {
    if (scratched[id]) return

    const today = new Date().toISOString().split('T')[0]
    const lastScratched = localStorage.getItem('lastScratchedDate')

    if (lastScratched === today && Object.keys(scratched).length === 0) {
      alert('Come tomorrow')
      return
    }

    if (Object.keys(scratched).length >= 1) {
      alert('Come tomorrow')
      return
    }

    setScratched(prev => ({ ...prev, [id]: true }))
    localStorage.setItem('lastScratchedDate', today)
  }

  return (
    <div className="page-wrapper">
      <HeroBanner image="/workers-sunset.jpg" height={160}>
        <TopBar title="Lucky Draw" transparent={true} />
        <div className="lucky-banner-text">
          <h2>Scratch & Win!</h2>
          <p>Uncover your lucky coupons today</p>
        </div>
      </HeroBanner>

      <WaveCard>
        <div className="scratch-grid">
          {coupons.map((coupon) => {
            const isScratched = scratched[coupon.id]
            return (
              <div 
                key={coupon.id} 
                className={`scratch-card ${isScratched ? 'scratched' : ''}`}
                onClick={() => handleScratch(coupon.id)}
              >
                {!isScratched ? (
                  <div className="scratch-cover">
                    <span>✨ Tap to Scratch ✨</span>
                  </div>
                ) : (
                  <div className={`scratch-result ${coupon.type}`}>
                    {coupon.type === 'win' ? (
                      <>
                        <span className="win-title">You Won!</span>
                        <span className="win-amount">{formatCurrency(coupon.amount)}</span>
                      </>
                    ) : (
                      <span className="lose-text">Try Again</span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </WaveCard>
      
      <BottomNavBar />
    </div>
  )
}
