import './AuthTabs.css'

export default function AuthTabs({ active, onChange }) {
  return (
    <div className="auth-tabs">
      {['Sign In', 'Sign Up'].map(tab => (
        <button
          key={tab}
          className={`auth-tab ${active === tab ? 'active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}