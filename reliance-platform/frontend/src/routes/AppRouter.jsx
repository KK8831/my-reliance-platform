import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute  from './PublicRoute'
import Login        from '../pages/auth/Login'
import Register     from '../pages/auth/Register'
import Home         from '../pages/home/Home'
import Invest       from '../pages/invest/Invest'
import Recharge     from '../pages/recharge/Recharge'
import Withdraw     from '../pages/withdraw/Withdraw'
import WithdrawHistory from '../pages/withdraw/WithdrawHistory'
import Notice       from '../pages/notice/Notice'
import Team         from '../pages/team/Team'
import TeamDetails  from '../pages/team/TeamDetails'
import My           from '../pages/my/My'
import Orders       from '../pages/my/Orders'
import CardWallet   from '../pages/my/CardWallet'
import Balance      from '../pages/my/Balance'
import Rewards      from '../pages/my/Rewards'
import VipLevel     from '../pages/vip/VipLevel'
import LuckyDraw    from '../pages/home/LuckyDraw'
import Earnings     from '../pages/home/Earnings'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/"                  element={<Home />} />
          <Route path="/invest"            element={<Invest />} />
          <Route path="/recharge"          element={<Recharge />} />
          <Route path="/withdraw"          element={<Withdraw />} />
          <Route path="/withdraw/history"  element={<WithdrawHistory />} />
          <Route path="/notice"            element={<Notice />} />
          <Route path="/team"              element={<Team />} />
          <Route path="/team/details"      element={<TeamDetails />} />
          <Route path="/my"                element={<My />} />
          <Route path="/my/orders"         element={<Orders />} />
          <Route path="/my/card-wallet"    element={<CardWallet />} />
          <Route path="/my/balance"        element={<Balance />} />
          <Route path="/my/rewards"        element={<Rewards />} />
          <Route path="/vip"               element={<VipLevel />} />
          <Route path="/lucky-draw"        element={<LuckyDraw />} />
          <Route path="/earnings"          element={<Earnings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}