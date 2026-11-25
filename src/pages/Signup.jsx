// Signup.jsx: registration form with basic validation.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput.jsx'
import { signup } from '../api.js'

function Signup({ onSignup }) {
  // One object holds every field; handleChange updates the right key by input name
  const [form, setForm] = useState({
    fullName: '', username: '', email: '', password: '', confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('') // message from the backend
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }) // copy old values, change one
  }

  const validate = () => {
    const err = {}
    if (!form.fullName.trim()) err.fullName = 'Enter your full name.'
    if (!form.username.trim()) err.username = 'Choose a username.'
    else if (form.username.length < 3) err.username = 'Username must be at least 3 characters.'
    if (!form.email.trim()) err.email = 'Enter your email.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email, like name@example.com.'
    if (!form.password) err.password = 'Create a password.'
    else if (form.password.length < 6) err.password = 'Password must be at least 6 characters.'
    if (!form.confirmPassword) err.confirmPassword = 'Confirm your password.'
    else if (form.confirmPassword !== form.password) err.confirmPassword = 'Passwords do not match.'
    return err
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length > 0) return

    setLoading(true)
    setServerError('')
    try {
      // confirmPassword is only for the frontend check, so we don't send it
      const { fullName, username, email, password } = form
      const data = await signup({ fullName, username, email, password })
      onSignup(data.token, data.user) // backend logs us in right after signup
    } catch (error) {
      setServerError(error.message) // e.g. "That email is already registered."
    } finally {
      setLoading(false)
    }
  }

  // Small helper so the three text fields don't repeat the same markup
  const textField = (name, label, type = 'text', autoComplete) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        autoComplete={autoComplete}
        className={errors[name] ? 'input-error' : ''}
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  )

  return (
    <div className="card">
      <h1>Create your account</h1>
      <p className="subtitle">It takes less than a minute.</p>

      <form onSubmit={handleSubmit} noValidate>
        {textField('fullName', 'Full name', 'text', 'name')}
        {textField('username', 'Username', 'text', 'username')}
        {textField('email', 'Email', 'email', 'email')}

        <PasswordInput
          id="password" label="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password} autoComplete="new-password"
        />
        <PasswordInput
          id="confirmPassword" label="Confirm password" value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          error={errors.confirmPassword} autoComplete="new-password"
        />

        {serverError && <div className="alert">{serverError}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  )
}

export default Signup