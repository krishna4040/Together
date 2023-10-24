import React from 'react'
import { setToken } from '../../store/slices/user'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setLogout }) => {

    const dispacth = useDispatch();
    const navigate = useNavigate();
    const btn1Handler = () => {
        dispacth(setToken(null));
        toast.success('Logged out');
        setLogout(false);
        navigate('/');
    }

    const btn2Handler = () => {
        setLogout(false);
    }

    return (
        <div>
            <label class="modal-overlay"></label>
            <div class={`modal flex flex-col gap-5 show pause-scroll w-full lg:w-[25%]`}>
                <button class={`absolute right-4 top-3`} onClick={() => { setLogout(false) }}>✕</button>
                <h2 class="text-xl">Logout</h2>
                <span>Sure You wanna Logout</span>
                <div class="flex gap-3">
                    <button className="flex-1 btn solid danger" onClick={btn1Handler}>Logout</button>
                    <button className="flex-1 btn solid bw" onClick={btn2Handler}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Logout