import { createContext, useContext, useState } from 'react'

const BalanceContext = createContext(null)

export function BalanceProvider({ children }) {
  const [rechargeBalance, setRechargeBalance] = useState(0)
  const [withdrawBalance, setWithdrawBalance] = useState(0)
  const [productIncome,   setProductIncome]   = useState(0)

  const updateBalances = ({ recharge, withdraw, product }) => {
    if (recharge !== undefined) setRechargeBalance(recharge)
    if (withdraw !== undefined) setWithdrawBalance(withdraw)
    if (product  !== undefined) setProductIncome(product)
  }

  return (
    <BalanceContext.Provider value={{
      rechargeBalance, withdrawBalance, productIncome, updateBalances
    }}>
      {children}
    </BalanceContext.Provider>
  )
}

export const useBalance = () => useContext(BalanceContext)