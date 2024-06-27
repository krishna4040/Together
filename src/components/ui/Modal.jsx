import { useRef } from "react"
import { useClickOutside } from "../../hooks/useClickOutside"

export function Modal({children, outSideCallback}) {
    const ref = useRef(null)
    useClickOutside(ref, outSideCallback)

    return (
        <div>
            <label className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm">
                <div ref={ref} className={`modal flex flex-col gap-5 show pause-scroll w-full lg:w-[25%]`}>
                    {children}
                </div>
            </label>
        </div>
    )
}