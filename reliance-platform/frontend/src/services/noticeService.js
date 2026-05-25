const BASE = import.meta.env.VITE_API_URL

export const noticeService = {
  getAll: (token) => fetch(`${BASE}/notice`,    { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
  getOne: (id, token) => fetch(`${BASE}/notice/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
}