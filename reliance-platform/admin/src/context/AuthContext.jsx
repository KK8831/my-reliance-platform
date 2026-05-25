import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin,   setAdmin]   = useState(null)
  const [token,   setToken]   = useState(() => localStorage.getItem('admin_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('admin_user')
    if (stored && token) setAdmin(JSON.parse(stored))
    setLoading(false)
  }, [token])

  const login = (userData, authToken) => {
    setAdmin(userData)
    setToken(authToken)
    localStorage.setItem('admin_token', authToken)
    localStorage.setItem('admin_user',  JSON.stringify(userData))
  }

  const logout = () => {
    setAdmin(null)
    setToken(null)
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, loading, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)