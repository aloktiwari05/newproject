import { useState, createContext, useContext, useEffect } from "react";
import { refresh } from '../api/api.js'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        refresh(setAccessToken, setIsLoading, setUser );
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isLoading, setIsLoading, user, setUser }}>
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