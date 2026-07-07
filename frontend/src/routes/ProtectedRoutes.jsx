import { Outlet, Navigate } from 'react-router-dom'
import {useAuth} from '../context/authContext.jsx'

function ProtectedRoutes() {

    const {accessToken} = useAuth()
        return (!accessToken) ? <Navigate to='/login' replace /> : <Outlet />
}

export default ProtectedRoutes