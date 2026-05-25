import { useEffect, useState } from 'react'
import { Typography, Table, Button, Space, Modal, Form, Input, Select, Switch, Popconfirm, message, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { adminService } from '../services/adminService'
import dayjs from 'dayjs'

const { Title }    = Typography
const { TextArea } = Input

export default function Notices() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(false)
  const [modal,   setModal]   = useState({ open: false, notice: null })
  const [form]                = Form.useForm()

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await adminService.getNotices()
      setData(res.notices || [])
    } catch {
      setData([
        { _id: '1', title: 'Lucky Roulette',      type: 'lucky_roulette', is_active: true,  createdAt: '2026-03-22T09:33:33' },
        { _id: '2', title: 'Daily Login Rewards',  type: 'daily_login',    is_active: true,  createdAt: '2026-03-22T09:32:30' },
        { _id: '3', title: 'Referral Rewards',     type: 'referral',       is_active: true,  createdAt: '2026-03-22T09:30:55' },
        { _id: '4', title: 'Recharge Rewards',     type: 'recharge',       is_active: true,  createdAt: '2026-03-22T09:25:02' },
      ])
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const openModal = (notice = null) => {
    setModal({ open: true, notice })
    if (notice) form.setFieldsValue(notice)
    else form.resetFields()
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      if (modal.notice) {
        await adminService.updateNotice(modal.notice._id, values)
        message.success('Notice updated')
      } else {
        await adminService.createNotice(values)
        message.success('Notice created')
      }
      setModal({ open: false, notice: null })
      fetchData()
    } catch (err) {
      if (err.errorFields) return
      message.error('Failed to save notice')
    }
  }

  const handleDelete = async (id) => {
    try {
      await adminService.deleteNotice(id)
      message.success('Notice deleted')
      fetchData()
    } catch { message.error('Failed to delete') }
  }

  const TYPE_COLORS = { lucky_roulette: 'gold', daily_login: 'blue', referral: 'green', recharge: 'purple', general: 'default' }

  const columns = [
    { title: 'Title',   dataIndex: 'title',     render: t => <strong>{t}</strong> },
    { title: 'Type',    dataIndex: 'type',       render: t => <Tag color={TYPE_COLORS[t]}>{t.replace('_',' ').toUpperCase()}</Tag> },
    { title: 'Active',  dataIndex: 'is_active',  render: v => <Tag color={v ? 'success' : 'error'}>{v ? 'Active' : 'Hidden'}</Tag> },
    { title: 'Created', dataIndex: 'createdAt',  render: d => dayjs(d).format('DD MMM YYYY HH:mm') },
    {
      title: 'Actions', render: (_, row) => (
        <Space>
          <Button size="small" icon={<EditOutlined />}   onClick={() => openModal(row)}>Edit</Button>
          <Popconfirm title="Delete this notice?" onConfirm={() => handleDelete(row._id)} okType="danger">
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>📢 Notices</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>Add Notice</Button>
      </div>

      <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" />

      <Modal
        title={modal.notice ? 'Edit Notice' : 'Add Notice'}
        open={modal.open}
        onOk={handleSave}
        onCancel={() => setModal({ open: false, notice: null })}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="title"   label="Title"   rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="content" label="Content"><TextArea rows={4} /></Form.Item>
          <Form.Item name="type"    label="Type"    rules={[{ required: true }]}>
            <Select options={['lucky_roulette','daily_login','referral','recharge','general'].map(t => ({ value: t, label: t.replace('_',' ').toUpperCase() }))} />
          </Form.Item>
          <Form.Item name="icon_url"  label="Icon URL"><Input placeholder="/assets/icons/vip-icon.svg" /></Form.Item>
          <Form.Item name="is_active" label="Active" valuePropName="checked"><Switch /></Form.Item>
        </Form>
      </Modal>
    </div>
  )
}