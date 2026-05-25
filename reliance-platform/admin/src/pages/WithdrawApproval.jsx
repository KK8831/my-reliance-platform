import { useEffect, useState } from 'react'
import { Typography, Table, Tag, Button, Space, Popconfirm, Modal, Input, message, Badge } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { adminService } from '../services/adminService'
import dayjs from 'dayjs'

const { Title }    = Typography
const { TextArea } = Input

export default function WithdrawApproval() {
  const [data,       setData]       = useState([])
  const [loading,    setLoading]    = useState(false)
  const [rejectModal,setRejectModal]= useState({ open: false, id: null, reason: '' })
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

  const fetchData = async (page = 1) => {
    setLoading(true)
    try {
      const res = await adminService.getWithdrawals({ page, limit: 10, status: 'pending' })
      setData(res.withdrawals || [])
      setPagination(p => ({ ...p, total: res.total || 0, current: page }))
    } catch {
      setData([
        { _id: '1', user_id: { nickname: 'Raj Kumar', phone: '91*****23' }, amount: 5000, fee_amount: 250, net_amount: 4750, bank_card_id: { bank_name: 'SBI', last4: '4523' }, status: 'pending', createdAt: new Date() },
        { _id: '2', user_id: { nickname: 'Priya',     phone: '98*****67' }, amount: 2000, fee_amount: 100, net_amount: 1900, bank_card_id: { bank_name: 'HDFC',last4: '7891' }, status: 'pending', createdAt: new Date() },
      ])
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleApprove = async (id) => {
    try {
      await adminService.approveWithdraw(id)
      message.success('Withdrawal approved')
      fetchData(pagination.current)
    } catch { message.error('Failed to approve') }
  }

  const handleReject = async () => {
    try {
      await adminService.rejectWithdraw(rejectModal.id, rejectModal.reason)
      message.success('Withdrawal rejected')
      setRejectModal({ open: false, id: null, reason: '' })
      fetchData(pagination.current)
    } catch { message.error('Failed to reject') }
  }

  const columns = [
    {
      title:  'User',
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.user_id?.nickname}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{row.user_id?.phone}</div>
        </div>
      ),
    },
    { title: 'Amount',     dataIndex: 'amount',     render: v => <strong>₹{Number(v).toLocaleString('en-IN')}</strong> },
    { title: 'Fee (5%)',   dataIndex: 'fee_amount',  render: v => `₹${Number(v || 0).toLocaleString('en-IN')}` },
    { title: 'Net Amount', dataIndex: 'net_amount',  render: v => `₹${Number(v).toLocaleString('en-IN')}` },
    { title: 'Bank',       dataIndex: 'bank_card_id',render: c => c ? `${c.bank_name} •••• ${c.last4}` : '—' },
    { title: 'Status',     dataIndex: 'status',      render: s => <Badge status={s === 'pending' ? 'processing' : 'success'} text={s.toUpperCase()} /> },
    { title: 'Date',       dataIndex: 'createdAt',   render: d => dayjs(d).format('DD MMM YYYY HH:mm') },
    {
      title:  'Actions',
      render: (_, row) => (
        <Space>
          <Popconfirm title="Approve this withdrawal?" onConfirm={() => handleApprove(row._id)} okText="Yes, Approve">
            <Button type="primary" size="small" icon={<CheckOutlined />}>Approve</Button>
          </Popconfirm>
          <Button danger size="small" icon={<CloseOutlined />} onClick={() => setRejectModal({ open: true, id: row._id, reason: '' })}>
            Reject
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        💰 Withdrawal Approvals
        {data.length > 0 && <Badge count={data.length} style={{ marginLeft: 12 }} />}
      </Title>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
        pagination={pagination}
        onChange={p => fetchData(p.current)}
        scroll={{ x: 900 }}
      />

      <Modal
        title="Reject Withdrawal"
        open={rejectModal.open}
        onOk={handleReject}
        onCancel={() => setRejectModal({ open: false, id: null, reason: '' })}
        okText="Reject" okButtonProps={{ danger: true }}
      >
        <p style={{ marginBottom: 12 }}>Please provide a reason for rejection:</p>
        <TextArea
          rows={3}
          placeholder="Reason for rejection..."
          value={rejectModal.reason}
          onChange={e => setRejectModal(p => ({ ...p, reason: e.target.value }))}
        />
      </Modal>
    </div>
  )
}
