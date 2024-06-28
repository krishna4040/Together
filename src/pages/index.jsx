import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import Logout from '../components/common/Logout';
import Search from '../components/common/Search';
import Notifications from '../components/common/Notifications';
import { useSelector } from 'react-redux';
import BottomNavigation from '../components/common/BottomNavigation';
import UpperNavigation from '../components/common/UpperNavigation';
import Sidebar from '../components/common/Sidebar';

export const DashBoard = () => {
    const [logout, setLogout] = useState(false);
    const [search, setSearch] = useState(false);
    const [notification, setNotification] = useState(false);
    const notificationRef = useRef(null);

    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === '/') {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <main>
            <Outlet />
            {
                token &&
                <>
                    {
                        window.innerWidth > 768 ?
                            <Sidebar notificationRef={notificationRef} setLogout={setLogout} setSearch={setSearch} setNotification={setNotification} /> :
                            <>
                                <BottomNavigation setLogout={setLogout} setSearch={setSearch} />
                                <UpperNavigation notificationRef={notificationRef} setNotification={setNotification} setSearch={setSearch} />
                            </>
                    }
                </>
            }
            {logout && <Logout setLogout={setLogout} />}
            {search && <Search setSearch={setSearch} search={search} />}
            {notification && <Notifications setNotification={setNotification} notification={notification} notificationRef={notificationRef} />}
        </main>
    )
}