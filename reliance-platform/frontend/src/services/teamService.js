const BASE = import.meta.env.VITE_API_URL
const get  = (url, token) => fetch(`${BASE}${url}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())

export const teamService = {
  getTeam:        (token) => get('/team',           token),
  getTeamDetails: (token) => get('/team/details',   token),
  getCommissions: (token) => get('/team/commissions', token),
}