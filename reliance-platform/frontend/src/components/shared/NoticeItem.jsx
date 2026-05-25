import { formatDate } from '../../utils/formatDate'
import './NoticeItem.css'

export default function NoticeItem({ icon, title, date, onClick }) {
  return (
    <div className="notice-item" onClick={onClick}>
      {icon ? <img src={icon} alt={title} className="notice-icon" /> : <div className="notice-icon-fallback">🔔</div>}
      <div className="notice-info">
        <p className="notice-title">{title}</p>
        <p className="notice-date">{formatDate(date)}</p>
      </div>
    </div>
  )
}