import React from 'react'

const Logout = ({ setLogout }) => {

    const btn1Handler = () => {

    }

    const btn2Handler = () => {
        setLogout(false);
    }

    return (
        <div>
            <label class="modal-overlay"></label>
            <div class={`modal flex flex-col gap-5 show pause-scroll`}>
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