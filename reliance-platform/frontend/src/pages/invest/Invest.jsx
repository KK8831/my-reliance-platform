import { useState } from 'react'
import { useAuth }   from '../../context/AuthContext'
import { productService } from '../../services/productService'
import ProductTabs      from '../../components/invest/ProductTabs'
import StablePlanCard   from '../../components/invest/StablePlanCard'
import DailyPlanCard    from '../../components/invest/DailyPlanCard'
import ActivityPlanCard from '../../components/invest/ActivityPlanCard'
import HeroBanner       from '../../components/layout/HeroBanner'
import BottomNavBar     from '../../components/layout/BottomNavBar'
import CustomerServiceBtn from '../../components/shared/CustomerServiceBtn'
import { STABLE_PLANS }   from '../../constants/stablePlans'
import { DAILY_PLANS }    from '../../constants/dailyPlans'
import { ACTIVITY_PLANS } from '../../constants/activityPlans'
import './Invest.css'

export default function Invest() {
  const [activeTab, setActiveTab] = useState('Stable')
  const { token } = useAuth()

  const handleBuy = async (plan) => {
    if (!window.confirm(`Buy ${plan.name} for ₹${plan.price}?`)) return
    const res = await productService.buy(plan.id, token)
    alert(res.message || 'Purchase successful')
  }

  return (
    <div className="page-wrapper">
      <HeroBanner image="/oil-rig.jpg" height={120}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 12, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          Reliance Platform
        </div>
      </HeroBanner>

      <ProductTabs active={activeTab} onChange={setActiveTab} />

      <div className="invest-list">
        {activeTab === 'Stable'   && STABLE_PLANS.map(p   => <StablePlanCard   key={p.id} plan={p} onBuy={handleBuy} />)}
        {activeTab === 'Daily'    && DAILY_PLANS.map(p    => <DailyPlanCard    key={p.id} plan={p} onBuy={handleBuy} />)}
        {activeTab === 'Activity' && ACTIVITY_PLANS.map(p => <ActivityPlanCard key={p.id} plan={p} onBuy={handleBuy} />)}
      </div>

      <CustomerServiceBtn />
      <BottomNavBar />
    </div>
  )
}