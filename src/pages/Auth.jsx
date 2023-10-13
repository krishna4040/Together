import React, { useState } from 'react'
import nick from '../assets/nick.png'
import LoginForm from '../components/core/Auth/LoginForm'
import SignupForm from '../components/core/Auth/SignupForm'

const Auth = () => {

    const [tab, setTab] = useState('signup');

    return (
        <section className='flex items-center justify-between h-screen overflow-hidden bg-slate-950'>
            <div className='flex items-center justify-center w-1/2'>
                <img src={nick} alt="image" />
            </div>
            <div className='flex flex-col w-1/2 gap-5'>
                <div className='flex items-center justify-center gap-10'>
                    <button onClick={() => { setTab('signup') }} className={`text-white uppercase transition-all duration-200 ${tab === 'signup' ? 'btn solid info' : ''}`}>Signup</button>
                    <button onClick={() => { setTab('login') }} className={`text-white uppercase transition-all duration-200 ${tab === 'login' ? 'btn solid info' : ''}`}>Login</button>
                </div>
                <div className='min-h-[400px] p-4'>
                    {tab === 'signup' && <SignupForm />}
                    {tab === 'login' && <LoginForm />}
                </div>
            </div>
        </section>
    )
}

export default Auth