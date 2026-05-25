import { useEffect, useState } from 'react'
import { Typography, Table, Tag, Button, Space, Modal, Form, Input, Select, InputNumber, Switch, message, Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { adminService } from '../services/adminService'

const { Title } = Typography

export default function Products() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(false)
  const [modal,   setModal]   = useState({ open: false, product: null })
  const [form]                = Form.useForm()

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await adminService.getProducts()
      setData(res.products || [])
    } catch {
      setData([
        { _id: '1', name: 'Purchase upgrade to VIP1', type: 'stable',   price: 290,  daily_earnings: 240.7,  revenue_days: 49, total_income: 11794.3,  required_vip_level: 0, is_active: true },
        { _id: '2', name: 'VIP1 Benefits',            type: 'daily',    price: 200,  daily_earnings: 340,    revenue_days: 1,  total_income: 340,       required_vip_level: 1, is_active: true },
        { _id: '3', name: 'Refinery Project',         type: 'activity', price: 966,  hourly_earnings: 86537, revenue_days: 1,  total_income: 86399,     required_vip_level: 1, is_active: true },
      ])
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const openModal = (product = null) => {
    setModal({ open: true, product })
    if (product) form.setFieldsValue(product)
    else form.resetFields()
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      if (modal.product) {
        await adminService.updateProduct(modal.product._id, values)
        message.success('Product updated')
      } else {
        await adminService.createProduct(values)
        message.success('Product created')
      }
      setModal({ open: false, product: null })
      fetchData()
    } catch (err) {
      if (err.errorFields) return
      message.error('Failed to save product')
    }
  }

  const handleDelete = async (id) => {
    try {
      await adminService.deleteProduct(id)
      message.success('Product deleted')
      fetchData()
    } catch { message.error('Failed to delete') }
  }

  const handleToggle = async (id) => {
    try {
      await adminService.toggleProduct(id)
      message.success('Product status updated')
      fetchData()
    } catch { message.error('Failed to toggle') }
  }

  const columns = [
    { title: 'Name',  dataIndex: 'name',  render: (n, row) => <div><div style={{ fontWeight: 600 }}>{n}</div><div style={{ fontSize: 12, color: '#888' }}>{row.badge}</div></div> },
    { title: 'Type',  dataIndex: 'type',  render: t => <Tag color={t === 'stable' ? 'blue' : t === 'daily' ? 'green' : 'orange'}>{t.toUpperCase()}</Tag> },
    { title: 'Price', dataIndex: 'price', render: v => `₹${Number(v).toLocaleString('en-IN')}` },
    { title: 'Daily Earnings', dataIndex: 'daily_earnings',  render: v => v ? `₹${Number(v).toLocaleString('en-IN')}` : '—' },
    { title: 'Days',  dataIndex: 'revenue_days', render: v => `${v} day${v > 1 ? 's' : ''}` },
    { title: 'VIP',   dataIndex: 'required_vip_level', render: v => <Tag>VIP {v}+</Tag> },
    { title: 'Active',dataIndex: 'is_active', render: (v, row) => <Switch checked={v} size="small" onChange={() => handleToggle(row._id)} /> },
    {
      title: 'Actions', render: (_, row) => (
        <Space>
          <Button size="small" icon={<EditOutlined />}   onClick={() => openModal(row)}>Edit</Button>
          <Popconfirm title="Delete this product?" onConfirm={() => handleDelete(row._id)} okType="danger">
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>🛍️ Products</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>Add Product</Button>
      </div>

      <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" scroll={{ x: 900 }} />

      <Modal
        title={modal.product ? 'Edit Product' : 'Add Product'}
        open={modal.open}
        onOk={handleSave}
        onCancel={() => setModal({ open: false, product: null })}
        width={600}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name"  label="Product Name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="type"  label="Type"         rules={[{ required: true }]}>
            <Select options={['stable','daily','activity'].map(t => ({ value: t, label: t.toUpperCase() }))} />
          </Form.Item>
          <Form.Item name="price" label="Price (₹)"    rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={1} /></Form.Item>
          <Form.Item name="daily_earnings"  label="Daily Earnings (₹)"> <InputNumber style={{ width: '100%' }} min={0} /></Form.Item>
          <Form.Item name="hourly_earnings" label="Hourly Earnings (₹)"><InputNumber style={{ width: '100%' }} min={0} /></Form.Item>
          <Form.Item name="revenue_days"    label="Revenue Days"        rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={1} /></Form.Item>
          <Form.Item name="total_income"    label="Total Income (₹)"   rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} /></Form.Item>
          <Form.Item name="required_vip_level" label="Required VIP Level">
            <Select options={[0,1,2,3,4,5,6,7].map(l => ({ value: l, label: `VIP ${l}` }))} />
          </Form.Item>
          <Form.Item name="image_url" label="Image URL"><Input placeholder="/assets/images/oil-rig-1.jpg" /></Form.Item>
          <Form.Item name="badge"     label="Badge Label"><Input placeholder="VIP.0" /></Form.Item>
        </Form>
      </Modal>
    </div>
  )
}