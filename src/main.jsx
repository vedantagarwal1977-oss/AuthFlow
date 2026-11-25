// Entry point: mounts React into <div id="root"> in index.html.
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // enables routing for the whole app
import App from './App.jsx'
import './index.css' // global styles, loaded once here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Everything inside BrowserRouter can use routes, <Link> and useNavigate */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)