const BASE = import.meta.env.VITE_API_URL

export const productService = {
  getByType: (type, token) =>
    fetch(`${BASE}/products?type=${type}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
  buy: (productId, token) =>
    fetch(`${BASE}/products/buy`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ product_id: productId }) }).then(r => r.json()),
  getOrders: (token) =>
    fetch(`${BASE}/orders`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
}