import React, { useState } from 'react'
import insta from '../assets/insta.png'
import LoginForm from '../components/core/Auth/LoginForm'
import SignupForm from '../components/core/Auth/SignupForm'
import VerificationForm from '../components/core/Auth/VeificationForm'
import ProfileForm from '../components/core/Auth/ProfileForm'

const Auth = () => {

    const [tab, setTab] = useState('signup');

    return (
        <div className="relative h-screen w-screen bg-black overflow-y-hidden flex flex-col">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
            <h1 className='p-2 text-5xl font-bold text-center text-white font-Confortaa z-10 mt-7'>Together</h1>
            <div className='flex flex-col items-center justify-center gap-20 p-2 lg:flex-row'>
                <div className='items-center justify-center hidden overflow-hidden lg:flex'>
                    <img src={insta} alt="image" />
                </div>
                <div className='flex flex-col w-full gap-5 lg:w-1/2 z-10'>
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
        </div>
    )
}

export default Auth