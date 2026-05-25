const BASE = import.meta.env.VITE_API_URL

const post = (url, body, token) =>
  fetch(`${BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
    body: JSON.stringify(body),
  }).then(r => r.json())

export const authService = {
  login:     (phone, password)                          => post('/auth/login',      { phone, password }),
  register:  (phone, nickname, password, code, otp)    => post('/auth/register',   { phone, nickname, password, invitation_code: code, otp }),
  sendOtp:   (phone)                                   => post('/auth/send-otp',   { phone }),
  verifyOtp: (phone, otp)                              => post('/auth/verify-otp', { phone, otp }),
}