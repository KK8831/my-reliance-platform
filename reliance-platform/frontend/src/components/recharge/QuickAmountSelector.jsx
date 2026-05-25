import { QUICK_AMOUNTS } from '../../constants/quickAmounts'
import './QuickAmountSelector.css'

export default function QuickAmountSelector({ selected, onChange }) {
  return (
    <div className="quick-amounts">
      {QUICK_AMOUNTS.map(amt => (
        <button
          key={amt}
          className={`amount-circle ${selected === amt ? 'selected' : ''}`}
          onClick={() => onChange(amt)}
        >
          {amt}
        </button>
      ))}
    </div>
  )
}