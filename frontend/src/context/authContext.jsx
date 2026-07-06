import { useState, createContext, useContext } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
    
}

const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

export { AuthProvider, useAuth }