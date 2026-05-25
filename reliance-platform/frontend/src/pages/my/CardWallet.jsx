import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { withdrawService } from '../../services/withdrawService'
import TopBar from '../../components/layout/TopBar'
import HeroBanner from '../../components/layout/HeroBanner'
import WaveCard from '../../components/shared/WaveCard'
import GradientButton from '../../components/shared/GradientButton'
import BottomNavBar from '../../components/layout/BottomNavBar'

export default function CardWallet() {
  const [cards, setCards]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [adding, setAdding]     = useState(false)
  const [form, setForm]         = useState({ bank_name: '', account_number: '', ifsc_code: '', holder_name: '' })
  const [submitting, setSubmitting] = useState(false)
  const { token } = useAuth()

  const loadCards = () => {
    withdrawService.getCards(token)
      .then(res => { if (res.cards) setCards(res.cards) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadCards() }, [token])

  const handleAdd = async () => {
    if (!form.bank_name || !form.account_number || !form.ifsc_code || !form.holder_name)
      return alert('Please fill all fields')
    setSubmitting(true)
    try {
      const res = await withdrawService.addCard(form, token)
      if (res.success) { setAdding(false); setForm({ bank_name:'', account_number:'', ifsc_code:'', holder_name:'' }); loadCards() }
      else alert(res.message || 'Failed to add card')
    } finally { setSubmitting(false) }
  }

  const inputStyle = {
    width:'100%', padding:'12px 14px', border:'1px solid #e0e0e0', borderRadius:10,
    fontSize:14, marginBottom:12, fontFamily:'var(--font-family)', background:'#f7f7f7', display:'block'
  }

  return (
    <div className="page-wrapper">
      <HeroBanner image="/city-skyline.jpg" height={130}>
        <TopBar title="Card Wallet" />
      </HeroBanner>
      <WaveCard>
        {loading ? (
          <p style={{ textAlign:'center', padding:32, color:'#999' }}>Loading...</p>
        ) : (
          <>
            {cards.length === 0 && !adding && (
              <div style={{ textAlign:'center', padding:32 }}>
                <div style={{ fontSize:48, marginBottom:12 }}>💳</div>
                <p style={{ color:'#999', marginBottom:16 }}>No bank cards added yet</p>
              </div>
            )}
            {cards.map((card, i) => (
              <div key={card._id || i} style={{
                background:'linear-gradient(135deg, #1A237E, #E53935)',
                borderRadius:16, padding:'18px 20px', marginBottom:12, color:'#fff'
              }}>
                <p style={{ margin:'0 0 6px', opacity:0.8, fontSize:12 }}>{card.bank_name}</p>
                <p style={{ margin:'0 0 12px', fontSize:20, fontWeight:700, letterSpacing:4 }}>
                  •••• •••• •••• {(card.account_number || '').slice(-4)}
                </p>
                <p style={{ margin:0, fontSize:13, opacity:0.9 }}>{card.account_name}</p>
                <p style={{ margin:'4px 0 0', fontSize:11, opacity:0.7 }}>IFSC: {card.ifsc_code}</p>
              </div>
            ))}

            {adding ? (
              <div>
                <p style={{ fontWeight:700, fontSize:15, marginBottom:14 }}>Add Bank Card</p>
                {[['bank_name','Bank Name'],['holder_name','Account Holder Name'],['account_number','Account Number'],['ifsc_code','IFSC Code']].map(([key,label]) => (
                  <div key={key}>
                    <label style={{ fontSize:12, color:'#757575', fontWeight:600 }}>{label}</label>
                    <input style={inputStyle} placeholder={label} value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                  </div>
                ))}
                <GradientButton onClick={handleAdd} disabled={submitting}>
                  {submitting ? 'Adding...' : 'Add Card'}
                </GradientButton>
                <button onClick={() => setAdding(false)} style={{
                  width:'100%', padding:12, marginTop:8, background:'none',
                  border:'1px solid #e0e0e0', borderRadius:24, cursor:'pointer', fontSize:14, color:'#757575'
                }}>Cancel</button>
              </div>
            ) : (
              <div style={{ marginTop: cards.length ? 12 : 0 }}>
                <GradientButton onClick={() => setAdding(true)}>+ Add Bank Card</GradientButton>
              </div>
            )}
          </>
        )}
      </WaveCard>
      <BottomNavBar />
    </div>
  )
}
