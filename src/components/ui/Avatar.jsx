export function Avatar({ src, h, w, p, scaleOnHover = false, border = false }) {
    return (
        <div className={`w-[${w}px] h-[${h}px] p-[${p}px] flex items-center justify-center rounded-full overflow-hidden ${scaleOnHover ? 'hover:scale-110 duration-200 transition-all' : ''}} ${border ? 'border' : ''}`}>
            <img src={src || ""} alt="user_image" className='w-full' />
        </div>
    )
}