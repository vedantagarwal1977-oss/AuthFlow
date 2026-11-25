// Welcome.jsx: the page users see after logging in or signing up.
import { LogOut } from 'lucide-react'

// "username" and "onLogout" arrive as props from App.jsx
function Welcome({ username, onLogout }) {
  return (
    <div className="card welcome">
      <h1>Welcome, {username}!</h1>
      <p className="subtitle">
        You're signed in. Glad to have you here. This page will show your real account once the backend is connected.
      </p>
      <button className="btn btn-primary" onClick={onLogout}>
        <LogOut size={16} /> Log out
      </button>
    </div>
  )
}

export default Welcome