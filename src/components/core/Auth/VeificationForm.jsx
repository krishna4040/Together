import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import toast from 'react-hot-toast';
import axios from 'axios';

const VeificationForm = ({ setTab }) => {

    const { signupData } = useSelector(state => state.auth);
    const { token } = useSelector(state => state.auth);
    const [otp, setOtp] = useState('');

    const connectHandler = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
                userName: signupData.userName,
                email: signupData.email,
                password: signupData.password,
                otp: otp
            });
            // profile creation 
            const profileRes = await axios.post(`${import.meta.env.VITE_BASE_URL}/profile/createProfile`, {
                gender: signupData.gender
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response || !profileRes) {
                throw new Error(`Could not create profile`);
            }
            toast.success('signed up succesfully');
            setTab('login');
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col justify-center gap-5'>
            <p className='text-white capitalize'>An OTP has been sent to your email account {signupData.email}</p>
            <div className='flex flex-col justify-center gap-2'>
                <p className='text-xl font-bold text-white'>Enter OTP</p>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => { return <input {...props} /> }}
                    containerStyle={{
                        width: '400px',
                        height: '100px',
                        backgroundColor: 'whitesmoke',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        borderRadius: '10px',
                        padding: '10px 10px'
                    }}
                    inputStyle={{
                        width: '100%',
                        height: '70px',
                        border: '1px',
                        borderRadius: '5px',
                        borderColor: 'black',
                        backgroundColor: 'rgb(2,6,23)',
                        color: 'white',
                        fontSize: '30px'
                    }}
                />
                {/* <input type="text" value={otp} onChange={(event) => { setOtp(event.target.value) }} /> */}
            </div>
            <button className='w-24 btn solid success' onClick={connectHandler}>Connect</button>
        </div>
    )
}

export default VeificationForm