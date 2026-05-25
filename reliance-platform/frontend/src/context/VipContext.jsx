import { createContext, useContext, useState } from 'react'
import { VIP_LEVELS } from '../constants/vipLevels'

const VipContext = createContext(null)

export function VipProvider({ children }) {
  const [vipLevel,      setVipLevel]      = useState(0)
  const [totalInvested, setTotalInvested] = useState(0)

  const nextLevel = VIP_LEVELS.find(v => v.level === vipLevel + 1)
  const progress  = nextLevel
    ? Math.min((totalInvested / nextLevel.minInvestment) * 100, 100)
    : 100

  return (
    <VipContext.Provider value={{ vipLevel, setVipLevel, totalInvested, setTotalInvested, nextLevel, progress }}>
      {children}
    </VipContext.Provider>
  )
}

export const useVip = () => useContext(VipContext)