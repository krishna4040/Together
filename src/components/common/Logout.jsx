import React from 'react'
import { setToken } from '../../store/slices/auth'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setLogout }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btn1Handler = () => {
        dispatch(setToken(null));
        toast.success('Logged out');
        setLogout(false);
        navigate('/');
    }

    const btn2Handler = () => {
        setLogout(false);
    }

    return (
        <div>
            <label className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm">
                <div className={`modal flex flex-col gap-5 show pause-scroll w-full lg:w-[25%]`}>
                    <button className={`absolute right-4 top-3`} onClick={() => { setLogout(false) }}>✕</button>
                    <h2 className="text-xl">Logout</h2>
                    <span>Sure You wanna Logout</span>
                    <div className="flex gap-3">
                        <button className="flex-1 btn solid danger" onClick={btn1Handler}>Logout</button>
                        <button className="flex-1 btn solid bw" onClick={btn2Handler}>Cancel</button>
                    </div>
                </div>
            </label>
        </div>
    )
}

export default Logout