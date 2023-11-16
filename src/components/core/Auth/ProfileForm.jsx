import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axios from 'axios'

const ProfileForm = ({ setTab }) => {
    const form = useForm();
    const { register, handleSubmit } = form;
    const { userId } = useSelector(state => state.auth);

    const sumbitHandler = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/createProfile`, {
                gender: data.gender,
                userName: data.userName,
                id: userId
            });
            if (!response) {
                throw new Error(`Could not create profile`);
            }
            toast.success("profile created succesfully");
            setTab("login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(sumbitHandler)}>
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="userName" className='text-xs text-white uppercase w-fit'>Username</label></td>
                        <td><input type="text" {...register("userName")} className='text-white input success lg' placeholder='Enter Your Username' autoComplete='off' /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="gender" className='text-xs text-white uppercase w-fit'>Gender</label></td>
                        {/* <td><input type="text" {...register("gender")} className='text-white input success lg' placeholder='Enter Your Gender' autoComplete='off' /></td> */}
                        <td>
                            <select {...register("gender")}>
                                <option value="" selected>Select Your Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><button className='text-white'>Create Profile</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default ProfileForm