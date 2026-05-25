import api from './api'

export const adminService = {
  // Auth
  login: (phone, password) => api.post('/auth/login', { phone, password }),

  // Dashboard
  getStats:        () => api.get('/admin/stats'),
  getRevenueChart: () => api.get('/admin/revenue-chart'),

  // Users
  getUsers:        (params) => api.get('/admin/users',      { params }),
  getUserById:     (id)     => api.get(`/admin/users/${id}`),
  toggleUser:      (id)     => api.patch(`/admin/users/${id}/toggle`),
  deleteUser:      (id)     => api.delete(`/admin/users/${id}`),
  updateUserVip:   (id, vip_level) => api.patch(`/admin/users/${id}/vip`, { vip_level }),

  // Transactions
  getTransactions: (params) => api.get('/admin/transactions', { params }),
  updateTxStatus:  (id, status) => api.patch(`/admin/transactions/${id}/status`, { status }),

  // Products
  getProducts:     ()       => api.get('/products'),
  createProduct:   (data)   => api.post('/admin/products',       data),
  updateProduct:   (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct:   (id)     => api.delete(`/admin/products/${id}`),
  toggleProduct:   (id)     => api.patch(`/admin/products/${id}/toggle`),

  // Withdrawals
  getWithdrawals:  (params) => api.get('/admin/withdrawals',     { params }),
  approveWithdraw: (id)     => api.patch(`/admin/withdrawals/${id}/approve`),
  rejectWithdraw:  (id, reason) => api.patch(`/admin/withdrawals/${id}/reject`, { reason }),

  // Commissions
  getCommissions:  (params) => api.get('/admin/commissions',     { params }),

  // Notices
  getNotices:      ()       => api.get('/admin/notices'),
  createNotice:    (data)   => api.post('/admin/notices',        data),
  updateNotice:    (id, data) => api.put(`/admin/notices/${id}`, data),
  deleteNotice:    (id)     => api.delete(`/admin/notices/${id}`),

  // Settings
  getSettings:     ()       => api.get('/admin/settings'),
  updateSettings:  (data)   => api.put('/admin/settings',        data),
}