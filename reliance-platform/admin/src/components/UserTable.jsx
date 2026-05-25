import { Table, Tag, Button, Space, Popconfirm, Avatar } from 'antd'
import { UserOutlined, EditOutlined, DeleteOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

export default function UserTable({ data, loading, onToggle, onDelete, onEditVip, pagination, onChange }) {
  const columns = [
    {
      title:     'User',
      dataIndex: 'nickname',
      render:    (name, row) => (
        <Space>
          <Avatar icon={<UserOutlined />} style={{ background: '#1A237E' }} />
          <div>
            <div style={{ fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{row.phone}</div>
          </div>
        </Space>
      ),
    },
    {
      title:     'VIP Level',
      dataIndex: 'vip_level',
      render:    (lvl) => (
        <Tag color={lvl >= 5 ? 'gold' : lvl >= 3 ? 'blue' : 'default'}>
          VIP {lvl}
        </Tag>
      ),
      filters:   [0,1,2,3,4,5,6,7].map(l => ({ text: `VIP ${l}`, value: l })),
      onFilter:  (val, row) => row.vip_level === val,
    },
    {
      title:     'Recharge Balance',
      dataIndex: 'recharge_balance',
      render:    (v) => `₹${Number(v).toLocaleString('en-IN')}`,
      sorter:    (a, b) => a.recharge_balance - b.recharge_balance,
    },
    {
      title:     'Withdraw Balance',
      dataIndex: 'withdraw_balance',
      render:    (v) => `₹${Number(v).toLocaleString('en-IN')}`,
      sorter:    (a, b) => a.withdraw_balance - b.withdraw_balance,
    },
    {
      title:     'Total Invested',
      dataIndex: 'total_invested',
      render:    (v) => `₹${Number(v).toLocaleString('en-IN')}`,
      sorter:    (a, b) => a.total_invested - b.total_invested,
    },
    {
      title:     'Status',
      dataIndex: 'is_active',
      render:    (active) => <Tag color={active ? 'success' : 'error'}>{active ? 'Active' : 'Suspended'}</Tag>,
      filters:   [{ text: 'Active', value: true }, { text: 'Suspended', value: false }],
      onFilter:  (val, row) => row.is_active === val,
    },
    {
      title:     'Joined',
      dataIndex: 'createdAt',
      render:    (d) => dayjs(d).format('DD MMM YYYY'),
      sorter:    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title:  'Actions',
      render: (_, row) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => onEditVip(row)}>VIP</Button>
          <Popconfirm title={`${row.is_active ? 'Suspend' : 'Activate'} this user?`} onConfirm={() => onToggle(row._id)}>
            <Button
              size="small"
              icon={row.is_active ? <StopOutlined /> : <CheckOutlined />}
              danger={row.is_active}
            >
              {row.is_active ? 'Suspend' : 'Activate'}
            </Button>
          </Popconfirm>
          <Popconfirm title="Delete this user permanently?" onConfirm={() => onDelete(row._id)} okType="danger">
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="_id"
      pagination={pagination}
      onChange={onChange}
      scroll={{ x: 1000 }}
    />
  )
}