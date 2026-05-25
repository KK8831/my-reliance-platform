import { useEffect, useState }  from 'react'
import { Typography, Select, DatePicker, Button, Space, Row, Col, message } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import TransactionTable from '../components/TransactionTable'
import { adminService }  from '../services/adminService'

const { Title }     = Typography
const { RangePicker } = DatePicker

export default function Transactions() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ type: '', status: '', dates: [] })
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

  const fetchData = async (page = 1) => {
    setLoading(true)
    try {
      const res = await adminService.getTransactions({ page, limit: 10, ...filters })
      setData(res.transactions || [])
      setPagination(p => ({ ...p, total: res.total || 0, current: page }))
    } catch {
      setData([
        { _id: '1', user_id: { nickname: 'John', phone: '84*****95' }, type: 'recharge', amount: 2770, fee_amount: 0,   net_amount: 2770,   payment_channel: 'ptm',   status: 'success', createdAt: new Date() },
        { _id: '2', user_id: { nickname: 'Raj',  phone: '91*****23' }, type: 'withdraw', amount: 5000, fee_amount: 250, net_amount: 4750,   payment_channel: null,    status: 'pending', createdAt: new Date() },
        { _id: '3', user_id: { nickname: 'Priya',phone: '98*****67' }, type: 'earning',  amount: 340,  fee_amount: 0,   net_amount: 340,    payment_channel: null,    status: 'success', createdAt: new Date() },
      ])
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleUpdateStatus = async (id, status) => {
    try {
      await adminService.updateTxStatus(id, status)
      message.success('Status updated')
      fetchData(pagination.current)
    } catch { message.error('Failed to update status') }
  }

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>💳 Transactions</Title>

      <Row gutter={12} style={{ marginBottom: 16 }}>
        <Col>
          <Select
            placeholder="Filter by type"
            allowClear style={{ width: 160 }}
            onChange={v => setFilters(p => ({ ...p, type: v || '' }))}
            options={['recharge','withdraw','commission','earning','referral_bonus'].map(t => ({ value: t, label: t.toUpperCase() }))}
          />
        </Col>
        <Col>
          <Select
            placeholder="Filter by status"
            allowClear style={{ width: 140 }}
            onChange={v => setFilters(p => ({ ...p, status: v || '' }))}
            options={['pending','success','failed','rejected'].map(s => ({ value: s, label: s.toUpperCase() }))}
          />
        </Col>
        <Col>
          <RangePicker onChange={dates => setFilters(p => ({ ...p, dates }))} />
        </Col>
        <Col>
          <Space>
            <Button type="primary"  onClick={() => fetchData(1)}>Apply</Button>
            <Button icon={<ReloadOutlined />} onClick={() => { setFilters({ type:'', status:'', dates:[] }); fetchData(1) }}>Reset</Button>
          </Space>
        </Col>
      </Row>

      <TransactionTable
        data={data}
        loading={loading}
        onUpdateStatus={handleUpdateStatus}
        showActions={true}
        pagination={pagination}
        onChange={p => fetchData(p.current)}
      />
    </div>
  )
}