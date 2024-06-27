import * as React from 'react'

export function useClickOutside(elementRef, callback) {
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            event.preventDefault()
            if (elementRef && elementRef.current && !elementRef.current.contains(event.target)) {
                callback()
            }
            return
        }
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [elementRef, callback])
}