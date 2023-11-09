import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const SignupForm = ({ setTab }) => {

    const form = useForm();
    const { register, handleSubmit, formState, reset } = form;
    const { isSubmitSuccessful } = formState;

    const navigate = useNavigate();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful])

    const sumbitHandler = async (data) => {
        try {
            if (data.password !== data.confirmPassword) {
                throw new Error('password do not macth');
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("signed up successfully");
            setTab("login");
            navigate('/create-profile');
        } catch (error) {
            console.log(error.message);
            toast.error("unable to sign up");
        }
    }

    return (
        <form onSubmit={handleSubmit(sumbitHandler)} className='flex flex-col justify-center gap-5'>
            <table className='border-separate table-fixed border-spacing-5'>
                <tbody>
                    <tr>
                        <td><label htmlFor="userName" className='text-xs text-white uppercase w-fit'>User Name:</label></td>
                        <td><input type="text" {...register('userName', { required: true })} className='text-white input success lg' placeholder='Enter your User Name' autoComplete='off' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="email" className='text-xs text-white uppercase w-fit'>Email:</label></td>
                        <td><input type="email" {...register('email', { required: true })} className='text-white input success lg' placeholder='Enter your Email' autoComplete='off' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="password" className='text-xs text-white uppercase w-fit'>Password:</label></td>
                        <td><input type="password" {...register('password', { required: true })} className='text-white input success lg' placeholder='Enter Password' autoComplete='off' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="confirmPassword" className='text-xs text-white uppercase w-fit'>Confirm Password:</label></td>
                        <td><input type="password" {...register('confirmPassword', { required: true })} className='text-white input success lg' placeholder='Confirm Password' autoComplete='off' /></td>
                    </tr>
                </tbody>
            </table>

            <button className='w-24 btn solid success'>Connect</button>

        </form>
    )
}

export default SignupForm