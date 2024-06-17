import React, { useState } from 'react'
import instagram from '../assets/instagram.png'
import { SignupForm } from '../components/core/Auth'

const Auth = () => {

    const [isSignup, setIsSignup] = useState(false);

    return (
        <section className="relative h-screen w-screen bg-black flex flex-col overflow-y-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
            <h1 className='text-3xl text-white text-center w-full my-4 z-10'>Welcome to Together</h1>
            <div className='flex flex-col items-start justify-center gap-20 p-2 lg:flex-row'>
                <div className='items-center justify-center hidden overflow-hidden lg:flex'>
                    <img src={instagram} alt="image" />
                </div>
                <div className='flex flex-col w-full gap-5 lg:w-1/2 z-10 min-h-[650px] mt-5'>
                    <SignupForm isSignup={isSignup} setIsSignup={setIsSignup} />
                </div>
            </div>
        </section>
    )
}

export default Auth