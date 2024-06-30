export function Avatar({ src, h, w, p, scaleOnHover = false, border = false }) {
    return (
        <div
            style={{ width: `${w}px`, height: `${h}px`, padding: `${p}px` }}
            className={`relative rounded-full overflow-hidden ${scaleOnHover ? 'hover:scale-110 duration-200 transition-all' : ''} ${border ? 'border' : ''}`}
        >
            <img src={src || ""} alt="user_image" className='absolute top-0 left-0 w-full h-full object-cover' />
        </div>
    )
}
