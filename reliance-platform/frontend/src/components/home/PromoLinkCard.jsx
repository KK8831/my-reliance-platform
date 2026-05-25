import './PromoLinkCard.css'

export default function PromoLinkCard({ link, code, onCopy }) {
  return (
    <div className="promo-card">
      <div className="promo-left">
        <span className="promo-emoji">🎁</span>
        <div>
          <p className="promo-link">Invite Code: <span style={{ color: '#E53935', fontWeight: '800' }}>{code}</span></p>
          <p className="promo-text">Invite a friend and receive a <strong>50</strong> activation reward.</p>
          <div className="promo-social-shares">
            <a href={`whatsapp://send?text=Join me on Reliance Platform! Use my invite code ${code} or click here: ${link}`} className="social-btn wa">WhatsApp</a>
            <a href={`tg://msg?text=Join me on Reliance Platform! Use my invite code ${code} or click here: ${link}`} className="social-btn tg">Telegram</a>
            <a href={`sms:?&body=Join me on Reliance Platform! Use my invite code ${code} or click here: ${link}`} className="social-btn sms">SMS</a>
          </div>
        </div>
      </div>
      <button className="promo-copy-btn" onClick={onCopy}>Copy Link</button>
    </div>
  )
}