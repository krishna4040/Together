import { useSelector } from "react-redux"
import { Navigate, Outlet } from 'react-router-dom'

export const Protect = () => {
    const { token } = useSelector(state => state.auth)
    if (token) {
        return <Outlet />
    }
    return <Navigate to="/auth"/>
}