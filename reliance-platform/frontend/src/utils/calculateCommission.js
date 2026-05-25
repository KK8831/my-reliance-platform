import { COMMISSION_RATES } from '../constants/commissionRates'

export const calculateCommission = (amount, level) => {
  const rate = COMMISSION_RATES.find(r => r.level === level)
  return rate ? amount * rate.rate : 0
}