// PasswordInput.jsx: reusable password field with a show/hide toggle.
// Login and Signup both use it, so the toggle logic is written only once.
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

function PasswordInput({ id, label, value, onChange, error, autoComplete }) {
  const [visible, setVisible] = useState(false) // true = show plain text

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          id={id}
          type={visible ? 'text' : 'password'} // this switch is the whole trick
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={error ? 'input-error' : ''}
        />
        <button
          type="button" // "button" so it doesn't submit the form
          className="toggle"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  )
}

export default PasswordInput