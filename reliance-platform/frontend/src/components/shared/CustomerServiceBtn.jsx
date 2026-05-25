import './CustomerServiceBtn.css'

export default function CustomerServiceBtn({ onClick }) {
  return (
    <button className="cs-btn" onClick={onClick} aria-label="Customer Service">
      <img src="/assets/icons/help-icon.svg" alt="help" />
    </button>
  )
}