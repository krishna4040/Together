import { useSelector } from "react-redux"
import { Navigate, Outlet } from 'react-router-dom'

export const Protect = () => {
    const { token } = useSelector(state => state.auth)
    token ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace/>
}