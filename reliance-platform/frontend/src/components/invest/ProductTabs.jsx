import './ProductTabs.css'

const TABS = ['Stable', 'Daily', 'Activity']

export default function ProductTabs({ active, onChange }) {
  return (
    <div className="product-tabs">
      {TABS.map(tab => (
        <button
          key={tab}
          className={`product-tab ${active === tab ? 'active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
          {tab === 'Activity' && <span className="hot-badge">HOT</span>}
        </button>
      ))}
    </div>
  )
}