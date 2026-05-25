const BASE = import.meta.env.VITE_API_URL

export const withdrawService = {
  request: (amount, txPassword, bankCardId, token) =>
    fetch(`${BASE}/withdraw`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ amount, transaction_password: txPassword, bank_card_id: bankCardId }) }).then(r => r.json()),
  history: (token) =>
    fetch(`${BASE}/withdraw/history`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
  addCard: (cardData, token) =>
    fetch(`${BASE}/withdraw/bank-card`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(cardData) }).then(r => r.json()),
  getCards: (token) =>
    fetch(`${BASE}/withdraw/bank-cards`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
}