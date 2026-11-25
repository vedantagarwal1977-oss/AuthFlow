// App.jsx: holds the logged-in user, restores the session on page load, defines routes.
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Welcome from './pages/Welcome.jsx'
import { getMe } from './api.js'

function App() {
  const [user, setUser] = useState(null)         // { username, email, ... } or null
  const [checking, setChecking] = useState(true) // true while we verify a saved token
  const navigate = useNavigate()

  // Runs once on load: if a token is saved, ask the backend who it belongs to (/me)
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setChecking(false)
      return
    }
    getMe()
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem('token')) // invalid or expired: forget it
      .finally(() => setChecking(false))
  }, [])

  // Login and Signup both call this with the backend's response
  const handleAuthSuccess = (token, userData) => {
    localStorage.setItem('token', token)
    setUser(userData)
    navigate('/welcome')
  }

  // Logout = delete the token and clear the user
  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  if (checking) return <main className="page"><p>Loading...</p></main>

  return (
    <>
      <Navbar username={user?.username} onLogout={handleLogout} />
      <main className="page">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLogin={handleAuthSuccess} />} />
          <Route path="/signup" element={<Signup onSignup={handleAuthSuccess} />} />
          <Route
            path="/welcome"
            element={
              user ? (
                <Welcome username={user.username} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App