import React from 'react'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const navigate = useNavigate();

    const sumbitHandler = (data) => {
        console.log(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(sumbitHandler)} className='flex flex-col justify-center gap-5'>
            <table className='border-separate table-fixed border-spacing-5'>
                <tbody>
                    <tr>
                        <td><label htmlFor="userName" className='text-xs text-white uppercase w-fit'>User Name:</label></td>
                        <td><input type="text" {...register('userName', { required: true })} className='text-white input success lg' placeholder='Enter your User Name' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="email" className='text-xs text-white uppercase w-fit'>Email:</label></td>
                        <td><input type="email" {...register('email', { required: true })} className='text-white input success lg' placeholder='Enter your Email' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="password" className='text-xs text-white uppercase w-fit'>Password:</label></td>
                        <td><input type="password" {...register('password', { required: true })} className='text-white input success lg' placeholder='Enter Password' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="confirmPassword" className='text-xs text-white uppercase w-fit'>Confirm Password:</label></td>
                        <td><input type="text" {...register('confirmPassword', { required: true })} className='text-white input success lg' placeholder='Confirm Password' /></td>
                    </tr>
                </tbody>
            </table>

            <button className='btn solid success'>Connect</button>

            <DevTool control={control} />

        </form>
    )
}

export default SignupForm