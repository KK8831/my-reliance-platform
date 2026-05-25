import { Card, Statistic } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

export default function StatsCard({ title, value, prefix, suffix, trend, color = '#1A237E', icon }) {
  return (
    <Card
      className="stat-card"
      style={{ borderTop: `4px solid ${color}` }}
      bodyStyle={{ padding: 20 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Statistic
          title={title}
          value={value}
          prefix={prefix}
          suffix={suffix}
          valueStyle={{ color, fontSize: 28, fontWeight: 700 }}
        />
        {icon && (
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `${color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>
            {icon}
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div style={{ marginTop: 8, fontSize: 13, color: trend >= 0 ? '#52c41a' : '#ff4d4f' }}>
          {trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {' '}{Math.abs(trend)}% from last month
        </div>
      )}
    </Card>
  )
}