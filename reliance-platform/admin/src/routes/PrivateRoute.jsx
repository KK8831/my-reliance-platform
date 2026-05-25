import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Spin }   from 'antd'

export default function PrivateRoute() {
  const { isAuth, loading } = useAuth()
  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh' }}>
      <Spin size="large" />
    </div>
  )
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}