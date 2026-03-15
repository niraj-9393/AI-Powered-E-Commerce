
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/authContext.tsx'
import UserContext from './context/userContext.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
      <App />
      </UserContext>
    </AuthContext>

  </BrowserRouter>,
)
