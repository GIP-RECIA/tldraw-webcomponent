import './assets/scss/main.scss';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

if (import.meta.env.DEV) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
