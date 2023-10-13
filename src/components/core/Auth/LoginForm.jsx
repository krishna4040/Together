import React from 'react'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'

const LoginForm = () => {

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const sumbitHandler = (data) => {
        console.log(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(sumbitHandler)} className='flex flex-col justify-center gap-5'>

            <table className='border-separate table-fixed border-spacing-5'>
                <tr>
                    <td><label htmlFor="email" className='text-xs text-white uppercase w-fit'>Email:</label></td>
                    <td><input type='email' className='text-white input success lg' placeholder='Enter your email' {...register('email', { required: true })} /></td>
                </tr>
                <tr>
                    <td><label htmlFor="password" className='text-xs text-white uppercase w-fit'>Password:</label></td>
                    <td><input type="password" {...register('password', { required: true })} className='text-white input success lg' placeholder='Enter your email' /></td>
                </tr>
            </table>

            <button className='btn solid success'>Connect</button>

            <DevTool control={control} />
        </form>
    )
}

export default LoginForm