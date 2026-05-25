const BASE = import.meta.env.VITE_API_URL

export const rechargeService = {
  deposit: (amount, channel, token) =>
    fetch(`${BASE}/recharge`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ amount, channel }) }).then(r => r.json()),
  history: (token) =>
    fetch(`${BASE}/recharge/history`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
}