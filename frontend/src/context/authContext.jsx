import { useState, createContext, useContext, useEffect } from "react";
import { apiUrl } from '../config.js'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const verfiyRefreshToken = async () => {

            try {
                const result = await fetch(`${apiUrl}/api/refresh`, { credentials: 'include' })

                if (result.ok) {
                    const data = await result.json()
                    setAccessToken(data.accessToken)
                }
            } 
            catch (err) {

                console.log(err.message)

            } finally {

                setIsLoading(false)
                
            }
        }

        verfiyRefreshToken();
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser, isLoading }}>
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