import { Table, Tag, Button, Space } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const TYPE_COLORS = {
  recharge:       'blue',
  withdraw:       'orange',
  commission:     'purple',
  earning:        'green',
  referral_bonus: 'gold',
}

const STATUS_COLORS = {
  pending: 'warning',
  success: 'success',
  failed:  'error',
  rejected:'error',
}

export default function TransactionTable({ data, loading, onUpdateStatus, showActions = false, pagination, onChange }) {
  const columns = [
    {
      title:     'User',
      dataIndex: ['user_id', 'nickname'],
      render:    (_, row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.user_id?.nickname || 'N/A'}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{row.user_id?.phone}</div>
        </div>
      ),
    },
    {
      title:     'Type',
      dataIndex: 'type',
      render:    (t) => <Tag color={TYPE_COLORS[t] || 'default'}>{t.toUpperCase()}</Tag>,
      filters:   Object.keys(TYPE_COLORS).map(t => ({ text: t.toUpperCase(), value: t })),
      onFilter:  (val, row) => row.type === val,
    },
    {
      title:     'Amount',
      dataIndex: 'amount',
      render:    (v) => `₹${Number(v).toLocaleString('en-IN')}`,
      sorter:    (a, b) => a.amount - b.amount,
    },
    {
      title:     'Fee',
      dataIndex: 'fee_amount',
      render:    (v) => `₹${Number(v || 0).toLocaleString('en-IN')}`,
    },
    {
      title:     'Net Amount',
      dataIndex: 'net_amount',
      render:    (v) => <strong>₹{Number(v).toLocaleString('en-IN')}</strong>,
      sorter:    (a, b) => a.net_amount - b.net_amount,
    },
    {
      title:     'Channel',
      dataIndex: 'payment_channel',
      render:    (v) => v ? <Tag>{v.toUpperCase()}</Tag> : '—',
    },
    {
      title:     'Status',
      dataIndex: 'status',
      render:    (s) => <Tag color={STATUS_COLORS[s]}>{s.toUpperCase()}</Tag>,
      filters:   ['pending','success','failed','rejected'].map(s => ({ text: s.toUpperCase(), value: s })),
      onFilter:  (val, row) => row.status === val,
    },
    {
      title:     'Date',
      dataIndex: 'createdAt',
      render:    (d) => dayjs(d).format('DD MMM YYYY HH:mm'),
      sorter:    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    ...(showActions ? [{
      title:  'Actions',
      render: (_, row) => row.status === 'pending' ? (
        <Space>
          <Button size="small" type="primary"  icon={<CheckOutlined />} onClick={() => onUpdateStatus(row._id, 'success')}>Approve</Button>
          <Button size="small" danger          icon={<CloseOutlined />}  onClick={() => onUpdateStatus(row._id, 'rejected')}>Reject</Button>
        </Space>
      ) : '—',
    }] : []),
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="_id"
      pagination={pagination}
      onChange={onChange}
      scroll={{ x: 1100 }}
    />
  )
}