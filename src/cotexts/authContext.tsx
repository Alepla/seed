import { createContext, useCallback, useContext, useMemo, useState } from "react"
import Stash from "../infrastructure/stash"
import SuperFetch from "../infrastructure/superFetch"
import Auth from "../services/auth"
import { AuthInfo, LoginData } from "../types/auth"

interface AuthContextType {
  login: (data: LoginData) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const emptyAuthContext: AuthContextType = {
  login: () => Promise.resolve(),
  logout: () => {},
  isAuthenticated: false,
}

const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>(emptyAuthContext)

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedAuthInfo: AuthInfo = Stash.restoreAuth()
  const authInfoIsStored: boolean = Boolean(storedAuthInfo)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authInfoIsStored)

  const login = useCallback(async (data: LoginData) => {
    const response: AuthInfo = await Auth.login(data)
    if (response) {
      Stash.saveToken(response)
      SuperFetch.setToken(response.jwtToken)
    }
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    Stash.clearAuth()
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
    }),
    [login, logout, isAuthenticated]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthContextProvider, useAuthContext }
