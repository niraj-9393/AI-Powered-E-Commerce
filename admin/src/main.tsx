
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from '../../client/src/context/authContext.tsx'
import AdminContext from './context/adminContext.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthContext>
      <AdminContext>
      <App />
      </AdminContext>
    </AuthContext>
  </BrowserRouter>
)
