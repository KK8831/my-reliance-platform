import { useState }    from 'react'
import { Outlet }      from 'react-router-dom'
import { Layout }      from 'antd'
import AdminSidebar    from './AdminSidebar'
import AdminHeader     from './AdminHeader'
import './AdminLayout.css'

const { Content } = Layout

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminSidebar collapsed={collapsed} />
      <Layout>
        <AdminHeader collapsed={collapsed} onToggle={() => setCollapsed(p => !p)} />
        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}