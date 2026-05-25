import { useEffect, useState }  from 'react'
import { Typography, Input, Button, Space, Modal, Select, message, Row, Col } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import UserTable       from '../components/UserTable'
import { adminService } from '../services/adminService'

const { Title } = Typography

export default function Users() {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(false)
  const [search,  setSearch]  = useState('')
  const [vipModal, setVipModal] = useState({ open: false, user: null, level: 0 })
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

  const fetchUsers = async (page = 1) => {
    setLoading(true)
    try {
      const res = await adminService.getUsers({ page, limit: 10, search })
      setUsers(res.users || [])
      setPagination(p => ({ ...p, total: res.total || 0, current: page }))
    } catch {
      // Use mock data in development
      setUsers([
        { _id: '1', nickname: 'John',     phone: '84*****95', vip_level: 0, recharge_balance: 0,    withdraw_balance: 0,    total_invested: 0,    is_active: true,  createdAt: new Date() },
        { _id: '2', nickname: 'Raj Kumar', phone: '91*****23', vip_level: 2, recharge_balance: 5000, withdraw_balance: 2500, total_invested: 7770, is_active: true,  createdAt: new Date() },
        { _id: '3', nickname: 'Priya',     phone: '98*****67', vip_level: 1, recharge_balance: 290,  withdraw_balance: 100,  total_invested: 290,  is_active: false, createdAt: new Date() },
      ])
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleToggle = async (id) => {
    try {
      await adminService.toggleUser(id)
      message.success('User status updated')
      fetchUsers(pagination.current)
    } catch { message.error('Failed to update user') }
  }

  const handleDelete = async (id) => {
    try {
      await adminService.deleteUser(id)
      message.success('User deleted')
      fetchUsers(pagination.current)
    } catch { message.error('Failed to delete user') }
  }

  const handleEditVip = (user) => setVipModal({ open: true, user, level: user.vip_level })

  const handleVipSave = async () => {
    try {
      await adminService.updateUserVip(vipModal.user._id, vipModal.level)
      message.success('VIP level updated')
      setVipModal({ open: false, user: null, level: 0 })
      fetchUsers(pagination.current)
    } catch { message.error('Failed to update VIP') }
  }

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>👥 User Management</Title>

      <Row gutter={12} style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onPressEnter={() => fetchUsers(1)}
            allowClear
          />
        </Col>
        <Col>
          <Space>
            <Button type="primary"  icon={<SearchOutlined />}  onClick={() => fetchUsers(1)}>Search</Button>
            <Button                 icon={<ReloadOutlined />}   onClick={() => { setSearch(''); fetchUsers(1) }}>Reset</Button>
          </Space>
        </Col>
      </Row>

      <UserTable
        data={users}
        loading={loading}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEditVip={handleEditVip}
        pagination={pagination}
        onChange={(p) => fetchUsers(p.current)}
      />

      <Modal
        title="Update VIP Level"
        open={vipModal.open}
        onOk={handleVipSave}
        onCancel={() => setVipModal({ open: false, user: null, level: 0 })}
      >
        <p style={{ marginBottom: 12 }}>User: <strong>{vipModal.user?.nickname}</strong></p>
        <Select
          value={vipModal.level}
          onChange={v => setVipModal(p => ({ ...p, level: v }))}
          style={{ width: '100%' }}
          options={[0,1,2,3,4,5,6,7].map(l => ({ value: l, label: `VIP ${l}` }))}
        />
      </Modal>
    </div>
  )
}