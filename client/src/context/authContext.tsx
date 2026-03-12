import { createContext } from "react"

type AuthContextType = {
  serverUrl: string
}

export const authDataContext = createContext<AuthContextType | null>(null)

function AuthContext({ children }: { children: React.ReactNode }) {

  const value: AuthContextType = {
    serverUrl: "http://localhost:5000"
  }

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  )
}

export default AuthContext