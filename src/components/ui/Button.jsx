import React from 'react'
import { cn } from '../../utils/cn'
import { IoChevronBackCircle } from "react-icons/io5";
import { Button } from '@mui/base';

export const LightButton = ({ type, text, className, onClick }) => {
    return (
        <button type={type} className={cn(`px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200`, className)} onClick={onClick}>
            {text}
        </button>
    )
}

export const DarkButton = ({ type, text, className, onClick }) => {
    return (
        <button type={type} className={cn(`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`, className)} onClick={onClick}>
            {text}
        </button>
    )
}

export const BackButton = ({ type, text, className, onClick }) => {
    return (
        <Button type={type} className={className} onClick={onClick}>
            {text}
            <IoChevronBackCircle className='text-2xl' />
        </Button>
    )
}