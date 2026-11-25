const API_URL = 'http://localhost:5000/api/auth'

export async function signup(data) {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json()
  if (!response.ok) throw new Error(result.message)
  return result
}

export async function login(data) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json()
  if (!response.ok) throw new Error(result.message)
  return result
}

export async function getMe() {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  const result = await response.json()
  if (!response.ok) throw new Error(result.message)
  return result
}