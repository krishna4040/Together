import React, { useState } from 'react'
import nick from '../assets/nick.png'
import LoginForm from '../components/core/Auth/LoginForm'
import SignupForm from '../components/core/Auth/SignupForm'

const Auth = () => {

    const [tab, setTab] = useState('signup');

    return (
        <section className='flex flex-col gap-5 p-2 justify-center bg-gradient-to-b from-[rgba(2,0,36,1)] via-[rgba(1,98,137,1)] to-[rgba(0,212,255,1)] h-screen overflow-hidden'>
            <h1 className='p-2 text-5xl font-bold text-center text-white font-Confortaa'>Together</h1>
            <div className='flex items-center justify-between p-2'>
                <div className='flex items-center justify-center w-1/2 overflow-hidden'>
                    <img src={nick} alt="image" className='w-full h-[550px]' />
                </div>
                <div className='flex flex-col w-1/2 gap-5'>
                    <div className='flex items-center justify-center gap-10'>
                        <button onClick={() => { setTab('signup') }} className={`text-white uppercase transition-all duration-200 ${tab === 'signup' ? 'btn solid info' : ''}`}>Signup</button>
                        <button onClick={() => { setTab('login') }} className={`text-white uppercase transition-all duration-200 ${tab === 'login' ? 'btn solid info' : ''}`}>Login</button>
                    </div>
                    <div className='min-h-[400px] p-4'>
                        {tab === 'signup' && <SignupForm setTab={setTab} />}
                        {tab === 'login' && <LoginForm />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Auth