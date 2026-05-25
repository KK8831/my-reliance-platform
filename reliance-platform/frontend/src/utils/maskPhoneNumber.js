export const maskPhoneNumber = (phone) => {
  const s = String(phone)
  return `${s.slice(0, 2)}${'*'.repeat(s.length - 4)}${s.slice(-2)}`
}