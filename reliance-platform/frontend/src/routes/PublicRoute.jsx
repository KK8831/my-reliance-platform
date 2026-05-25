import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicRoute() {
  const { isAuth } = useAuth()
  return isAuth ? <Navigate to="/" replace /> : <Outlet />
}