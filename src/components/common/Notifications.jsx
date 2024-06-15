import React from 'react'

const Notifications = ({ setNotifications }) => {

    

    return (
        <div>
            <label className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm">
                <div className="flex flex-col w-full lg:w-[25%] gap-5 modal show pause-scroll">
                    <button className="absolute right-4 top-3" onClick={() => { setNotifications(false) }}>✕</button>
                    Hello
                </div>
            </label>
        </div>
    )
}

export default Notifications