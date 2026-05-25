const BASE = import.meta.env.VITE_API_URL

const get  = (url, token) => fetch(`${BASE}${url}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
const post = (url, body, token) => fetch(`${BASE}${url}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) }).then(r => r.json())

export const userService = {
  getProfile: (token)        => get('/user/profile', token),
  getBalance: (token)        => get('/user/balance',  token),
  updateProfile: (data, token) => post('/user/profile', data, token),
}