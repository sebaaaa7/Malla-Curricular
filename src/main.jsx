import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <StrictMode>
      <App />
    </StrictMode>,

  </MantineProvider>
)