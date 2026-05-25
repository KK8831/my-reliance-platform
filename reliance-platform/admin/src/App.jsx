import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute  from './routes/PrivateRoute'
import AdminLayout   from './components/layout/AdminLayout'
import Login         from './pages/Login'
import Dashboard     from './pages/Dashboard'
import Users         from './pages/Users'
import Transactions  from './pages/Transactions'
import Products      from './pages/Products'
import WithdrawApproval from './pages/WithdrawApproval'
import Commissions   from './pages/Commissions'
import Notices       from './pages/Notices'
import Settings      from './pages/Settings'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/"            element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard"   element={<Dashboard />} />
              <Route path="/users"       element={<Users />} />
              <Route path="/transactions"element={<Transactions />} />
              <Route path="/products"    element={<Products />} />
              <Route path="/withdrawals" element={<WithdrawApproval />} />
              <Route path="/commissions" element={<Commissions />} />
              <Route path="/notices"     element={<Notices />} />
              <Route path="/settings"    element={<Settings />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}