import { useState, createContext, useContext, useEffect } from "react";
import { refreshService, logoutService } from '../services/service.auth.js'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    
    const logout = async () => {
        setAccessToken(null)
        setUser(null)
        const response = await logoutService()
        console.log(response)

    }


    useEffect(() => {
        refreshService(setAccessToken, setIsLoading, setUser );
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isLoading, setIsLoading, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

export { AuthProvider, useAuth }