const BASE = import.meta.env.VITE_API_URL

export const vipService = {
  getLevels: (token) => fetch(`${BASE}/vip`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
}