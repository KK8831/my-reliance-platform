import './PhoneInput.css'

export default function PhoneInput({ value, onChange }) {
  return (
    <div className="phone-input-wrapper">
      <div className="country-code">+91 ▾</div>
      <input
        type="tel"
        placeholder="Phone Number"
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={10}
        className="phone-input"
      />
    </div>
  )
}