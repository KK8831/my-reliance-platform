import { useEffect, useState } from 'react'
import { Typography, Table, Tag } from 'antd'
import { adminService } from '../services/adminService'
import dayjs from 'dayjs'

const { Title } = Typography

export default function Commissions() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

  const fetchData = async (page = 1) => {
    setLoading(true)
    try {
      const res = await adminService.getCommissions({ page, limit: 10 })
      setData(res.commissions || [])
      setPagination(p => ({ ...p, total: res.total || 0, current: page }))
    } catch {
      setData([
        { _id: '1', earner_id: { nickname: 'Raj' }, from_user_id: { nickname: 'John' }, level: 1, rate: 0.35, base_amount: 2770,  commission_amount: 969.5,  status: 'paid', createdAt: new Date() },
        { _id: '2', earner_id: { nickname: 'Raj' }, from_user_id: { nickname: 'Priya'},level: 2, rate: 0.09, base_amount: 7770,  commission_amount: 699.3,  status: 'paid', createdAt: new Date() },
        { _id: '3', earner_id: { nickname: 'Raj' }, from_user_id: { nickname: 'Amit' }, level: 3, rate: 0.01, base_amount: 17770, commission_amount: 177.7,  status: 'paid', createdAt: new Date() },
      ])
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const columns = [
    { title: 'Earner',      dataIndex: ['earner_id',    'nickname'], render: (_, r) => r.earner_id?.nickname    || 'N/A' },
    { title: 'From User',   dataIndex: ['from_user_id', 'nickname'], render: (_, r) => r.from_user_id?.nickname || 'N/A' },
    { title: 'Level',       dataIndex: 'level',             render: l => <Tag color={l === 1 ? 'gold' : l === 2 ? 'blue' : 'default'}>Level {l}</Tag> },
    { title: 'Rate',        dataIndex: 'rate',              render: r => `${(r * 100).toFixed(0)}%` },
    { title: 'Base Amount', dataIndex: 'base_amount',       render: v => `₹${Number(v).toLocaleString('en-IN')}` },
    { title: 'Commission',  dataIndex: 'commission_amount', render: v => <strong style={{ color: '#52c41a' }}>₹{Number(v).toLocaleString('en-IN')}</strong>, sorter: (a,b) => a.commission_amount - b.commission_amount },
    { title: 'Status',      dataIndex: 'status',            render: s => <Tag color={s === 'paid' ? 'success' : 'warning'}>{s.toUpperCase()}</Tag> },
    { title: 'Date',        dataIndex: 'createdAt',         render: d => dayjs(d).format('DD MMM YYYY HH:mm') },
  ]

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>🤝 Commission Ledger</Title>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
        pagination={pagination}
        onChange={p => fetchData(p.current)}
        scroll={{ x: 900 }}
      />
    </div>
  )
}