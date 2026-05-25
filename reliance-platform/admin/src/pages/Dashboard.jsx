import { useEffect, useState } from 'react'
import { Row, Col, Typography, Card, Table, Tag } from 'antd'
import {
  UserOutlined, DollarOutlined,
  ShoppingOutlined, TeamOutlined,
} from '@ant-design/icons'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from 'recharts'
import StatsCard       from '../components/StatsCard'
import { adminService } from '../services/adminService'
import dayjs           from 'dayjs'

const { Title } = Typography

const MOCK_STATS = {
  totalUsers:        1247,
  totalDeposits:     8432000,
  totalWithdrawals:  3215000,
  totalProducts:     15,
  activeOrders:      342,
  pendingWithdrawals:23,
  totalCommissions:  987000,
  todaySignups:      47,
}

const MOCK_CHART = [
  { month: 'Jan', deposits: 420000, withdrawals: 180000 },
  { month: 'Feb', deposits: 680000, withdrawals: 290000 },
  { month: 'Mar', deposits: 950000, withdrawals: 410000 },
  { month: 'Apr', deposits: 780000, withdrawals: 350000 },
  { month: 'May', deposits: 1200000, withdrawals: 520000 },
  { month: 'Jun', deposits: 1450000, withdrawals: 640000 },
]

const MOCK_RECENT_TX = [
  { _id: '1', user: 'Raj Kumar',   type: 'recharge', amount: 2770,  status: 'success', date: new Date() },
  { _id: '2', user: 'Priya Singh', type: 'withdraw', amount: 5000,  status: 'pending', date: new Date() },
  { _id: '3', user: 'Amit Patel',  type: 'recharge', amount: 7770,  status: 'success', date: new Date() },
  { _id: '4', user: 'Neha Sharma', type: 'earning',  amount: 240.7, status: 'success', date: new Date() },
]

export default function Dashboard() {
  const [stats,    setStats]    = useState(MOCK_STATS)
  const [chart,    setChart]    = useState(MOCK_CHART)
  const [recentTx, setRecentTx] = useState(MOCK_RECENT_TX)
  const [loading,  setLoading]  = useState(false)

  useEffect(() => {
    setLoading(true)
    adminService.getStats()
      .then(res => { if (res.stats) setStats(res.stats) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const recentColumns = [
    { title: 'User',   dataIndex: 'user',   key: 'user' },
    { title: 'Type',   dataIndex: 'type',   key: 'type',   render: t => <Tag color="blue">{t}</Tag> },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: v => `₹${Number(v).toLocaleString('en-IN')}` },
    { title: 'Status', dataIndex: 'status', key: 'status', render: s => <Tag color={s === 'success' ? 'green' : 'orange'}>{s}</Tag> },
    { title: 'Date',   dataIndex: 'date',   key: 'date',   render: d => dayjs(d).format('DD MMM HH:mm') },
  ]

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>📊 Dashboard Overview</Title>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Total Users"     value={stats.totalUsers}        icon={<UserOutlined />}     color="#1A237E" trend={12} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Total Deposits"  value={stats.totalDeposits}     icon={<DollarOutlined />}   color="#52c41a" prefix="₹" trend={8} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Total Withdrawals" value={stats.totalWithdrawals} icon={<DollarOutlined />} color="#E53935" prefix="₹" trend={-3} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Active Orders"   value={stats.activeOrders}      icon={<ShoppingOutlined />} color="#fa8c16" trend={5} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Pending Withdrawals" value={stats.pendingWithdrawals} icon={<DollarOutlined />} color="#faad14" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Total Commissions" value={stats.totalCommissions} icon={<TeamOutlined />}   color="#722ed1" prefix="₹" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Today Signups"   value={stats.todaySignups}      icon={<UserOutlined />}     color="#13c2c2" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard title="Total Products"  value={stats.totalProducts}     icon={<ShoppingOutlined />} color="#eb2f96" />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="📈 Monthly Revenue" style={{ borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                <Tooltip formatter={v => `₹${Number(v).toLocaleString('en-IN')}`} />
                <Legend />
                <Bar dataKey="deposits"    fill="#1A237E" name="Deposits"    radius={[4,4,0,0]} />
                <Bar dataKey="withdrawals" fill="#E53935" name="Withdrawals" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="📉 Trend" style={{ borderRadius: 12, height: '100%' }}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                <Tooltip />
                <Line type="monotone" dataKey="deposits"    stroke="#1A237E" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="withdrawals" stroke="#E53935" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions */}
      <Card title="🕒 Recent Transactions" style={{ borderRadius: 12 }}>
        <Table
          columns={recentColumns}
          dataSource={recentTx}
          rowKey="_id"
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  )
}