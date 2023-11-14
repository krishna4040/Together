import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { setSignupData } from '../../../store/slices/auth'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SignupForm = ({ setTab }) => {

    const form = useForm();
    const { register, handleSubmit, formState, reset } = form;
    const { isSubmitSuccessful, errors } = formState;
    const dispacth = useDispatch();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const sumbitHandler = useCallback(async (data) => {
        try {
            console.log("singup");
            dispacth(setSignupData(data));
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/sendotp`, {
                email: data.email
            });
            if (response.data.success) {
                setTab("verification");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(sumbitHandler)} className='flex flex-col justify-center gap-5'>
            <table className='border-separate table-fixed border-spacing-5'>
                <tbody>
                    <tr>
                        <td><label htmlFor="email" className='text-xs text-white uppercase w-fit'>Email:</label></td>
                        <td><input type="email" {...register('email', { required: true })} className='text-white input success lg' placeholder='Enter your Email' autoComplete='off' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="password" className='text-xs text-white uppercase w-fit'>Password:</label></td>
                        <td><input type="password" {...register('password', {
                            minLength: {
                                value: 8,
                                message: 'Password should be at least 8 characters long',
                            },
                            pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
                                message: 'Password should contain at least one uppercase, lowercase, number, and special character',
                            },
                        })} className='text-white input success lg' placeholder='Enter Password' autoComplete='off' />
                            {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="confirmPassword" className='text-xs text-white uppercase w-fit'>Confirm Password:</label></td>
                        <td><input type="password" {...register('confirmPassword', { required: true })} className='text-white input success lg' placeholder='Confirm Password' autoComplete='off' /></td>
                    </tr>
                </tbody>
            </table>

            <button className='w-32 btn solid success'>Verify Email</button>

        </form>
    )
}

export default SignupForm