import './GradientButton.css'

export default function GradientButton({ children, onClick, type = 'button', disabled, fullWidth = true }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`gradient-btn ${fullWidth ? 'full-width' : ''} ${disabled ? 'disabled' : ''}`}
    >
      {children}
    </button>
  )
}

