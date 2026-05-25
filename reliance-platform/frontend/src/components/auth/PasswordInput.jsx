import { useState } from 'react'
import './PhoneInput.css'

export default function PasswordInput({ value, onChange, placeholder = 'Password' }) {
  const [show, setShow] = useState(false)
  return (
    <div className="phone-input-wrapper" style={{ marginBottom: '14px' }}>
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="phone-input"
        style={{ flex: 1 }}
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        style={{
          background: 'none',
          border: 'none',
          padding: '0 14px',
          cursor: 'pointer',
          fontSize: '18px',
          color: '#999'
        }}
      >
        {show ? '🙈' : '👁️'}
      </button>
    </div>
  )
}
