import axios from "axios";
import { useSelector } from "react-redux";

export const useAxiosWithAuth = () => {
    const { token } = useSelector(state => state.auth)

    const axiosPrivate = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return axiosPrivate
}

export const useAxiosWithoutAuth = () => {
    const axiosPublic = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
    })

    return axiosPublic
}