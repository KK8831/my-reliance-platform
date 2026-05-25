import { useState }    from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth }        from '../context/AuthContext'
import { adminService }   from '../services/adminService'

const { Title, Text } = Typography

export default function Login() {
  const [loading, setLoading] = useState(false)
  const { login }   = useAuth()
  const navigate    = useNavigate()

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const res = await adminService.login(values.phone, values.password)
      if (res.token) {
        login(res.user, res.token)
        message.success('Welcome back!')
        navigate('/dashboard')
      } else {
        message.error(res.message || 'Login failed')
      }
    } catch (err) {
      message.error(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight:      '100vh',
      background:     'linear-gradient(135deg, #1A237E, #E53935)',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
    }}>
      <Card style={{ width: 400, borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <Title level={3} style={{ margin: 0, color: '#1A237E' }}>Reliance Admin</Title>
          <Text type="secondary">Sign in to your admin account</Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit} size="large">
          <Form.Item name="phone" rules={[{ required: true, message: 'Enter phone number' }]}>
            <Input prefix={<UserOutlined />} placeholder="Phone Number" maxLength={10} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Enter password' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary" htmlType="submit"
              loading={loading} block
              style={{ background: 'linear-gradient(90deg, #1A237E, #E53935)', border: 'none', height: 48, fontSize: 16, fontWeight: 700 }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 16, color: '#888', fontSize: 13 }}>
          Default: 9999999999 / Admin@123
        </div>
      </Card>
    </div>
  )
}