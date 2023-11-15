import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setUserId } from '../../../store/slices/auth'

const VeificationForm = ({ setTab }) => {

    const { signupData } = useSelector(state => state.auth);
    const [otp, setOtp] = useState('');

    const connectHandler = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
                email: signupData.email,
                password: signupData.password,
                otp: otp
            });
            if (!response.data.success) {
                toast.error(response.data.message);
            }
            setUserId(response.data.data._id);
            toast.success('signed up succesfully');
            setTab('profile');
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const resendHandler = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/sendotp`, {
                email: signupData.email
            });
            if (response.data.success) {
                toast.success("otp resent successfully");
            }
        } catch ({ response }) {
            toast.error(response.data.message);
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
            </div>
            <button className='text-white' onClick={resendHandler}>Resend otp</button>
            <button className='w-24 btn solid success' onClick={connectHandler}>Connect</button>
        </div>
    )
}

export default VeificationForm