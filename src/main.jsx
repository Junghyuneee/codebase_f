import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Bootstrap CSS 추가
import "bootstrap/dist/css/bootstrap.min.css"
// Argon CSS 추가
import "./assets/css/argon-design-system-react.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  // </React.StrictMode>,
)
