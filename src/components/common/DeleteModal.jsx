import React from 'react'

const DeleteModal = ({ setModal, deleteHandler }) => {
    return (
        <div>
            <label className="modal-overlay"></label>
            <div className={`modal flex flex-col gap-5 show pause-scroll w-full lg:w-[25%]`}>
                <button className={`absolute right-4 top-3`} onClick={() => { setModal(false) }}>✕</button>
                <h2 className="text-xl">Confirm Delete</h2>
                <span>Once you delete there is no coming back</span>
                <div className="flex gap-3">
                    <button className="flex-1 btn solid danger" onClick={deleteHandler}>Delete</button>
                    <button className="flex-1 btn solid bw" onClick={() => { setModal(false) }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal