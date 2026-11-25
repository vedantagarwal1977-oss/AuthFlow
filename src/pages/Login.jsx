// Login.jsx: email + password form with basic validation.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput.jsx'
import { login } from '../api.js'

function Login({ onLogin }) {
  // One state variable per input ("controlled inputs")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({}) // e.g. { email: 'message' }
  const [serverError, setServerError] = useState('') // message from the backend
  const [loading, setLoading] = useState(false)       // disables the button while waiting

  // Returns an object of error messages; empty object = form is valid
  const validate = () => {
    const newErrors = {}
    if (!email.trim()) newErrors.email = 'Enter your email.'
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email, like name@example.com.'
    if (!password) newErrors.password = 'Enter your password.'
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // stop the browser from reloading the page
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return // stop if the form is invalid

    setLoading(true)
    setServerError('')
    try {
      // Send email + password to the backend; it replies with { token, user }
      const data = await login({ email, password })
      onLogin(data.token, data.user)
    } catch (err) {
      setServerError(err.message) // e.g. "Invalid email or password."
    } finally {
      setLoading(false) // runs whether it worked or failed
    }
  }

  return (
    <div className="card">
      <h1>Welcome back</h1>
      <p className="subtitle">Log in to your AuthFlow account.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
        />

        {serverError && <div className="alert">{serverError}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p className="switch">
        New to AuthFlow? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  )
}

export default Login