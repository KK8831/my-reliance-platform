import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authService } from '../../services/authService'
import HeroBanner    from '../../components/layout/HeroBanner'
import WaveCard      from '../../components/shared/WaveCard'
import PhoneInput    from '../../components/auth/PhoneInput'
import PasswordInput from '../../components/auth/PasswordInput'
import OtpInput      from '../../components/auth/OtpInput'
import AuthTabs      from '../../components/auth/AuthTabs'
import GradientButton from '../../components/shared/GradientButton'
import './Auth.css'

export default function Register() {
  const [params]     = useSearchParams()
  const [phone,      setPhone]      = useState('')
  const [nickname,   setNickname]   = useState('')
  const [password,   setPassword]   = useState('')
  const [inviteCode, setInviteCode] = useState(params.get('invitation_code') || '')
  const [otp,        setOtp]        = useState('')
  const [countdown,  setCountdown]  = useState(0)
  const [error,      setError]      = useState('')
  const [loading,    setLoading]    = useState(false)
  const navigate = useNavigate()

  const startCountdown = () => {
    setCountdown(60)
    const id = setInterval(() => setCountdown(p => { if (p <= 1) { clearInterval(id); return 0 } return p - 1 }), 1000)
  }

  const handleSendOtp = async () => {
    if (!phone) return setError('Enter phone number first')
    await authService.sendOtp(phone)
    startCountdown()
  }

  const handleSubmit = async () => {
    if (!phone || !nickname || !password || !otp) return setError('Please fill all fields')
    setLoading(true)
    try {
      const res = await authService.register(phone, nickname, password, inviteCode, otp)
      if (res.success) navigate('/login')
      else setError(res.message || 'Registration failed')
    } catch { setError('Network error') }
    finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <HeroBanner image="/city-skyline.jpg" height={180}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', textAlign: 'center', marginTop: 20 }}>
          Reliance Platform
        </div>
      </HeroBanner>
      <WaveCard>
        <AuthTabs active="Sign Up" onChange={t => t === 'Sign In' && navigate('/login')} />
        <div className="auth-label">Phone Number</div>
        <PhoneInput value={phone} onChange={setPhone} />
        <div className="auth-label">Nickname</div>
        <input className="plain-input" placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
        <div className="auth-label">Login Password</div>
        <PasswordInput value={password} onChange={setPassword} />
        <div className="auth-label">Invitation Code</div>
        <input className="plain-input" placeholder="Invitation Code" value={inviteCode} onChange={e => setInviteCode(e.target.value)} />
        <div className="auth-label">Verification Code (OTP)</div>
        <OtpInput value={otp} onChange={setOtp} onSend={handleSendOtp} countdown={countdown} />
        {error && <p className="auth-error">{error}</p>}
        <GradientButton onClick={handleSubmit} disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up Now'}
        </GradientButton>
      </WaveCard>
    </div>
  )
}