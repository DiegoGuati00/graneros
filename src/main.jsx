import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ComponentesProvider } from './contex/ComponentesContex'
import { ImgProvider } from './contex/ImgContex'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './contex/AuthContex'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ComponentesProvider>
      <AuthProvider>
        <HelmetProvider>
          <ImgProvider>
              <App />
          </ImgProvider>
        </HelmetProvider>
      </AuthProvider>
    </ComponentesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
