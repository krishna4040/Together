import React, { useEffect } from 'react'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../store/slices/user'

const LoginForm = () => {

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const navigate = useNavigate();
    const dispacth = useDispatch();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful])

    const sumbitHandler = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}login`, data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("signed up successfully");
            sessionStorage.setItem("token", response.data.token);
            dispacth(setToken(response.data.token));
            navigate('/create-profile');
        } catch (error) {
            console.log(error.message);
            toast.error("unable to sign in");
        }
    }

    return (
        <form onSubmit={handleSubmit(sumbitHandler)} className='flex flex-col justify-center gap-5'>

            <table className='border-separate table-fixed border-spacing-5'>
                <tbody>
                    <tr>
                        <td><label htmlFor="email" className='text-xs text-white uppercase w-fit'>Email:</label></td>
                        <td><input type='email' className='text-white input success lg' placeholder='Enter your email' {...register('email', { required: true })} autoComplete='off' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="password" className='text-xs text-white uppercase w-fit'>Password:</label></td>
                        <td><input type="password" {...register('password', { required: true })} className='text-white input success lg' placeholder='Enter your Password' autoComplete='off' /></td>
                    </tr>
                </tbody>
            </table>

            <button className='btn solid success'>Connect</button>

            <DevTool control={control} />
        </form>
    )
}

export default LoginForm