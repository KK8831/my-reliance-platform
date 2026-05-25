import { PAYMENT_CHANNELS } from '../../constants/paymentChannels'
import './PaymentChannelSelector.css'

export default function PaymentChannelSelector({ selected, onChange }) {
  return (
    <div className="channels">
      {PAYMENT_CHANNELS.map(ch => (
        <label key={ch.id} className="channel-row">
          <div>
            <p className="channel-name">{ch.label}</p>
            <p className="channel-range">₹{ch.min} - ₹{ch.max}</p>
          </div>
          <input type="radio" checked={selected === ch.id} onChange={() => onChange(ch.id)} />
        </label>
      ))}
    </div>
  )
}