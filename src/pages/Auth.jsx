import React, { useState } from 'react'
import instagram from '../assets/instagram.png'
import { SignupForm } from '../components/core/Auth'
import VerificationForm from '../components/core/Auth/Verification';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);

    return (
        <section className="relative h-screen w-screen bg-black flex flex-col overflow-y-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
            <h1 className='text-3xl text-white text-center w-full my-4 z-10'>Together</h1>
            <div className='flex flex-col items-start justify-center gap-20 p-2 lg:flex-row'>
                <div className='items-center justify-center hidden overflow-hidden lg:flex'>
                    <img src={instagram} alt="image" />
                </div>
                <div className='flex flex-col w-full gap-5 lg:w-1/2 z-10 min-h-[650px] mt-5'>
                    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            Welcome to Together
                        </h2>
                        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">Unite Your Community, Engage with Impact, Grow Your Brand - All Together in One Powerful Social Media SaaS.</p>
                        {
                            !isOtpSent ?
                                <SignupForm isSignup={isSignup} setIsSignup={setIsSignup} setIsOtpSent={setIsOtpSent} /> :
                                <VerificationForm setIsOtpSent={setIsOtpSent} />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Auth