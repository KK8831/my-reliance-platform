import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute() {
  const { isAuth, loading } = useAuth()
  if (loading) return <div className="skeleton" style={{ height: '100vh' }} />
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}