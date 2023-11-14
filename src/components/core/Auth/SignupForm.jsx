import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { setSignupData } from '../../../store/slices/auth'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SignupForm = ({ setTab }) => {

    const form = useForm();
    const { register, handleSubmit, formState, reset } = form;
    const { isSubmitSuccessful } = formState;
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
                        <td><label htmlFor="userName" className='text-xs text-white uppercase w-fit'>User Name:</label></td>
                        <td><input type="text" {...register('userName', { required: true })} className='text-white input success lg' placeholder='Enter your User Name' autoComplete='off' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="email" className='text-xs text-white uppercase w-fit'>Email:</label></td>
                        <td><input type="email" {...register('email', { required: true })} className='text-white input success lg' placeholder='Enter your Email' autoComplete='off' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="gender" className='text-xs text-white uppercase w-fit'>Gender</label></td>
                        {/* <td><input type="text" {...register('gender', { required: true })} className='text-white input success lg' placeholder='Select Your Gender' autoComplete='off' /></td> */}
                        <td>
                            <select {...register("gender")} className='text-[rgba(180,223,196)] input success lg bg-slate-950'>
                                <option value="DEFAULT">Select Your Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </td>
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

            <button className='w-32 btn solid success'>Verify Email</button>

        </form>
    )
}

export default SignupForm