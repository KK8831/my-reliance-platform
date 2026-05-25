import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'
import HeroBanner from '../../components/layout/HeroBanner'
import WaveCard   from '../../components/shared/WaveCard'
import PhoneInput    from '../../components/auth/PhoneInput'
import PasswordInput from '../../components/auth/PasswordInput'
import AuthTabs      from '../../components/auth/AuthTabs'
import GradientButton from '../../components/shared/GradientButton'
import './Auth.css'

export default function Login() {
  const [phone,    setPhone]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const { login }    = useAuth()
  const navigate     = useNavigate()

  const handleSubmit = async () => {
    if (!phone || !password) return setError('Please fill all fields')
    setLoading(true)
    try {
      const res = await authService.login(phone, password)
      if (res.token) { login(res.user, res.token); navigate('/') }
      else setError(res.message || 'Login failed')
    } catch { setError('Network error') }
    finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <HeroBanner image="/city-skyline.jpg" height={200}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', textAlign: 'center', marginTop: 20 }}>
          Reliance Platform
        </div>
      </HeroBanner>
      <WaveCard>
        <AuthTabs active="Sign In" onChange={t => t === 'Sign Up' && navigate('/register')} />
        <div className="auth-label">Phone Number</div>
        <PhoneInput value={phone} onChange={setPhone} />
        <div className="auth-label">Login Password</div>
        <PasswordInput value={password} onChange={setPassword} />
        {error && <p className="auth-error">{error}</p>}
        <GradientButton onClick={handleSubmit} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In Now'}
        </GradientButton>
      </WaveCard>
    </div>
  )
}