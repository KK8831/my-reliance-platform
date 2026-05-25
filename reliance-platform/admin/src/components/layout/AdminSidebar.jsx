import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu }             from 'antd'
import {
  DashboardOutlined, UserOutlined, TransactionOutlined,
  ShoppingOutlined, WalletOutlined, TeamOutlined,
  NotificationOutlined, SettingOutlined,
} from '@ant-design/icons'

const { Sider } = Layout

const MENU_ITEMS = [
  { key: '/dashboard',    icon: <DashboardOutlined />,      label: 'Dashboard'    },
  { key: '/users',        icon: <UserOutlined />,           label: 'Users'        },
  { key: '/transactions', icon: <TransactionOutlined />,    label: 'Transactions' },
  { key: '/products',     icon: <ShoppingOutlined />,       label: 'Products'     },
  { key: '/withdrawals',  icon: <WalletOutlined />,         label: 'Withdrawals'  },
  { key: '/commissions',  icon: <TeamOutlined />,           label: 'Commissions'  },
  { key: '/notices',      icon: <NotificationOutlined />,   label: 'Notices'      },
  { key: '/settings',     icon: <SettingOutlined />,        label: 'Settings'     },
]

export default function AdminSidebar({ collapsed }) {
  const navigate  = useNavigate()
  const location  = useLocation()

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={220}
      style={{ background: '#1A237E' }}
    >
      <div style={{
        height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        {!collapsed ? (
          <span style={{ color: '#D4A017', fontWeight: 900, fontSize: 18 }}>
            ⚡ Reliance Admin
          </span>
        ) : (
          <span style={{ color: '#D4A017', fontSize: 20 }}>⚡</span>
        )}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={MENU_ITEMS}
        style={{
          background:  '#1A237E',
          color:       '#fff',
          border:      'none',
          marginTop:   8,
        }}
        theme="dark"
      />
    </Sider>
  )
}