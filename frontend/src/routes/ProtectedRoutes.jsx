import { Outlet, Navigate } from 'react-router-dom'
import {useAuth} from '../context/authContext.jsx'

function ProtectedRoutes() {

    const {accessToken, isLoading} = useAuth()

        if(isLoading){
            return <div>Authenticating User !</div>
        }
        return (!accessToken) ? <Navigate to='/login' replace /> : <Outlet />
}

export default ProtectedRoutes