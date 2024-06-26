export function Modal({children}) {
    return (
        <div>
            <label className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm">
                <div className={`modal flex flex-col gap-5 show pause-scroll w-full lg:w-[25%]`}>
                    {children}
                </div>
            </label>
        </div>
    )
}