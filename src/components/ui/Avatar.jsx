export function Avatar({ src, h, w }) {
    return (
        <div className={`w-[${w}px] h-[${h}px] rounded-full overflow-hidden`}>
            <img src={src} alt="user_image" className='w-full' />
        </div>
    )
}