// Navbar.jsx: top bar shown on every page. Links change based on login state.
import { Link } from 'react-router-dom'
import { ShieldCheck, LogOut } from 'lucide-react'

function Navbar({ username, onLogout }) {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <ShieldCheck size={22} />
        AuthFlow
      </Link>

      {/* Ternary: show Logout if logged in, otherwise Login/Signup links */}
      {username ? (
        <button className="btn btn-ghost" onClick={onLogout}>
          <LogOut size={16} /> Logout
        </button>
      ) : (
        <nav className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup" className="nav-cta">Sign up</Link>
        </nav>
      )}
    </header>
  )
}

export default Navbar