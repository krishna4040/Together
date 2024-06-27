export function Avatar({ src, h, w, p, scaleOnHover = false, border = false }) {
    return (
        <div
            style={{ width: `${w}px`, height: `${h}px`, padding: `${p}px` }}
            className={`flex items-center justify-center rounded-full overflow-hidden ${scaleOnHover ? 'hover:scale-110 duration-200 transition-all' : ''} ${border ? 'border' : ''}`}
        >
            <img src={src || ""} alt="user_image" className='w-full' />
        </div>
    )
}
