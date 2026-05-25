import './OtpInput.css'

export default function OtpInput({ value, onChange, onSend, countdown }) {
  return (
    <div className="otp-wrapper">
      <input
        type="text"
        placeholder="Verification Code (OTP)"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="otp-input"
        maxLength={6}
      />
      <button
        type="button"
        className="send-btn"
        onClick={onSend}
        disabled={countdown > 0}
      >
        {countdown > 0 ? `${countdown}s` : 'Send'}
      </button>
    </div>
  )
}