import React, { useState } from 'react'
import insta from '../assets/insta.png'
import LoginForm from '../components/core/Auth/LoginForm'
import SignupForm from '../components/core/Auth/SignupForm'
import VerificationForm from '../components/core/Auth/VeificationForm'
import ProfileForm from '../components/core/Auth/ProfileForm'

const Auth = () => {

    const [tab, setTab] = useState('signup');

    return (
        <section className='flex flex-col justify-center h-screen gap-10 p-2 lg:gap-5 lg:overflow-hidden bg-gray-950'>
            <h1 className='p-2 text-5xl font-bold text-center text-white font-Confortaa'>Together</h1>
            <div className='flex flex-col items-center justify-center gap-20 p-2 lg:flex-row'>
                <div className='items-center justify-center hidden overflow-hidden lg:flex'>
                    <img src={insta} alt="image" className='' />
                </div>
                <div className='flex flex-col w-full gap-5 lg:w-1/2'>
                    <div className='flex items-center justify-center gap-10'>
                        <button onClick={() => { setTab('signup') }} className={`text-white uppercase transition-all duration-200 ${tab === 'signup' || tab === 'verification' || tab === 'profile' ? 'btn solid info' : ''}`}>
                            {(tab === 'signup' || tab === 'login') && "Signup"}
                            {tab === 'verification' && "Verify"}
                            {tab === 'profile' && "create profile"}
                        </button>
                        <button onClick={() => { setTab('login') }} className={`text-white uppercase transition-all duration-200 ${tab === 'login' ? 'btn solid info' : ''}`}>Login</button>
                    </div>
                    <div className='min-h-[400px] p-4'>
                        {tab === 'signup' && <SignupForm setTab={setTab} />}
                        {tab === 'login' && <LoginForm />}
                        {tab === 'verification' && <VerificationForm setTab={setTab} />}
                        {tab === 'profile' && <ProfileForm setTab={setTab} />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Auth