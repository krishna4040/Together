import React from 'react'

const Modal = ({ title, content, btn1, btn2, setShow, btn1Handler, btn2Handler }) => {
    return (
        <>
            <label class="modal-overlay"></label>
            <div class={`modal flex flex-col gap-5 show pause-scroll`}>
                <button class={`absolute right-4 top-3`} onClick={() => { setShow(false) }}>✕</button>
                <h2 class="text-xl">{title}</h2>
                <span>{content}</span>
                <div class="flex gap-3">
                    <button className="flex-1 btn solid danger" onClick={btn1Handler}>{btn1}</button>
                    <button className="flex-1 btn solid bw" onClick={btn2Handler}>{btn2}</button>
                </div>
            </div>
        </>
    )
}

export default Modal