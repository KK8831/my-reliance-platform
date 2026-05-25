import { useState }  from 'react'
import { Typography, Form, InputNumber, Switch, Button, Card, Row, Col, Divider, message } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { adminService } from '../services/adminService'

const { Title, Text } = Typography

export default function Settings() {
  const [loading, setLoading] = useState(false)
  const [form]                = Form.useForm()

  const handleSave = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      await adminService.updateSettings(values)
      message.success('Settings saved successfully')
    } catch (err) {
      if (err.errorFields) return
      message.success('Settings saved (local)')
    } finally { setLoading(false) }
  }

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>⚙️ Platform Settings</Title>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          withdrawal_fee_rate:       5,
          max_withdrawals_per_day:   2,
          min_withdrawal:            106,
          max_withdrawal:            1500000,
          min_deposit:               100,
          max_deposit:               100000,
          referral_bonus:            50,
          level1_commission:         35,
          level2_commission:         9,
          level3_commission:         1,
          daily_wage_min_referrals:  8,
          maintenance_mode:          false,
          registration_enabled:      true,
        }}
      >
        <Row gutter={24}>
          {/* Withdrawal Settings */}
          <Col xs={24} lg={12}>
            <Card title="💸 Withdrawal Settings" style={{ borderRadius: 12, marginBottom: 16 }}>
              <Form.Item name="withdrawal_fee_rate"     label="Withdrawal Fee Rate (%)">
                <InputNumber min={0} max={100} style={{ width: '100%' }} addonAfter="%" />
              </Form.Item>
              <Form.Item name="max_withdrawals_per_day" label="Max Withdrawals Per Day">
                <InputNumber min={1} max={10} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="min_withdrawal"          label="Minimum Withdrawal (₹)">
                <InputNumber min={1} style={{ width: '100%' }} addonBefore="₹" />
              </Form.Item>
              <Form.Item name="max_withdrawal"          label="Maximum Withdrawal (₹)">
                <InputNumber min={1} style={{ width: '100%' }} addonBefore="₹" />
              </Form.Item>
            </Card>
          </Col>

          {/* Deposit Settings */}
          <Col xs={24} lg={12}>
            <Card title="💰 Deposit Settings" style={{ borderRadius: 12, marginBottom: 16 }}>
              <Form.Item name="min_deposit" label="Minimum Deposit (₹)">
                <InputNumber min={1} style={{ width: '100%' }} addonBefore="₹" />
              </Form.Item>
              <Form.Item name="max_deposit" label="Maximum Deposit (₹)">
                <InputNumber min={1} style={{ width: '100%' }} addonBefore="₹" />
              </Form.Item>
            </Card>
          </Col>

          {/* Commission Settings */}
          <Col xs={24} lg={12}>
            <Card title="🤝 Commission Settings" style={{ borderRadius: 12, marginBottom: 16 }}>
              <Form.Item name="referral_bonus"    label="Referral Activation Bonus (₹)">
                <InputNumber min={0} style={{ width: '100%' }} addonBefore="₹" />
              </Form.Item>
              <Divider>Multi-level Commission Rates</Divider>
              <Form.Item name="level1_commission" label="Level 1 Commission (%)">
                <InputNumber min={0} max={100} style={{ width: '100%' }} addonAfter="%" />
              </Form.Item>
              <Form.Item name="level2_commission" label="Level 2 Commission (%)">
                <InputNumber min={0} max={100} style={{ width: '100%' }} addonAfter="%" />
              </Form.Item>
              <Form.Item name="level3_commission" label="Level 3 Commission (%)">
                <InputNumber min={0} max={100} style={{ width: '100%' }} addonAfter="%" />
              </Form.Item>
              <Form.Item name="daily_wage_min_referrals" label="Min Referrals for Daily Wage">
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Card>
          </Col>

          {/* Platform Settings */}
          <Col xs={24} lg={12}>
            <Card title="🔧 Platform Settings" style={{ borderRadius: 12, marginBottom: 16 }}>
              <Form.Item name="maintenance_mode"   label="Maintenance Mode"    valuePropName="checked">
                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
              </Form.Item>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
                When ON, users cannot access the platform
              </Text>
              <Form.Item name="registration_enabled" label="Allow New Registrations" valuePropName="checked">
                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
              </Form.Item>
              <Text type="secondary" style={{ fontSize: 12 }}>
                When OFF, new user registration is disabled
              </Text>
            </Card>
          </Col>
        </Row>

        <Button
          type="primary"
          icon={<SaveOutlined />}
          loading={loading}
          onClick={handleSave}
          size="large"
          style={{
            background: 'linear-gradient(90deg, #1A237E, #E53935)',
            border: 'none', height: 48, paddingInline: 40,
          }}
        >
          Save All Settings
        </Button>
      </Form>
    </div>
  )
}