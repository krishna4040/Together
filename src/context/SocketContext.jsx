import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'
import Loading from "../components/common/Loading";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCKET_URL)
        setSocket(socket)

        return () => {
            socket.disconnect()
            setSocket(null)
        }
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {socket ? children : <Loading />}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const socket = useContext(SocketContext)
    if (!socket) {
        throw new Error("socket not found")
    }
    return socket
}