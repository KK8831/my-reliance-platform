import { AuthProvider } from './context/AuthContext'
import { BalanceProvider } from './context/BalanceContext'
import { VipProvider } from './context/VipContext'
import AppRouter from './routes/AppRouter'

export default function App() {
  return (
    <AuthProvider>
      <BalanceProvider>
        <VipProvider>
          <AppRouter />
        </VipProvider>
      </BalanceProvider>
    </AuthProvider>
  )
}