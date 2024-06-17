import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import Logout from '../components/common/Logout';
import Search from '../components/common/Search';
import Notifications from '../components/common/Notifications';

export const DashBoard = () => {

    const [logout, setLogout] = useState(false);
    const [search, setSearch] = useState(false);
    const [notification, setNotification] = useState(false);

    return (
        <main>
            <Outlet />
            {
                token &&
                <>
                    <Sidebar setLogout={setLogout} setSearch={setSearch} setNotification={setNotification} />
                    <BottomNavigation setLogout={setLogout} setSearch={setSearch} />
                </>
            }
            {logout && <Logout setLogout={setLogout} />}
            {search && <Search setSearch={setSearch} />}
            {notification && <Notifications setNotification={setNotification} />}
        </main>
    )
}