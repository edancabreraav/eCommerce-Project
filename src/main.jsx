import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './share/css/allPages.css'
import AppAllModules from './AppAllModules'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AppAllModules />
  </StrictMode>,
)