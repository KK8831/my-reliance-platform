import { Layout, Button, Avatar, Dropdown, Space, Typography } from 'antd'
import {
  MenuFoldOutlined, MenuUnfoldOutlined,
  UserOutlined, LogoutOutlined,
} from '@ant-design/icons'
import { useAuth }    from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout
const { Text }   = Typography

export default function AdminHeader({ collapsed, onToggle }) {
  const { admin, logout } = useAuth()
  const navigate          = useNavigate()

  const menuItems = [
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true },
  ]

  const handleMenu = ({ key }) => {
    if (key === 'logout') { logout(); navigate('/login') }
  }

  return (
    <Header style={{
      background:    '#fff',
      padding:       '0 24px',
      display:       'flex',
      alignItems:    'center',
      justifyContent:'space-between',
      boxShadow:     '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        style={{ fontSize: 18 }}
      />
      <Dropdown menu={{ items: menuItems, onClick: handleMenu }} placement="bottomRight">
        <Space style={{ cursor: 'pointer' }}>
          <Avatar style={{ background: '#1A237E' }} icon={<UserOutlined />} />
          <Text strong>{admin?.nickname || 'Admin'}</Text>
        </Space>
      </Dropdown>
    </Header>
  )
}