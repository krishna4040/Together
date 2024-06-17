import React from 'react'
import { cn } from '../../utils/cn'

export const Button = ({ type, text, className, onClick }) => {
    return (
        <button type={type} className={cn(`px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200`, className)} onClick={onClick}>
            {text}
        </button>
    )
}