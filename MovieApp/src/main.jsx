import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MovieApp from './Components/MovieApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <MovieApp />
  </StrictMode>,
)
