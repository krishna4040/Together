import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useForm } from 'react-hook-form';

const EditPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { token } = useSelector(state => state.user);
    const [user, setUser] = useState({});
    const fecthUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}getUserDetails`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthUser();
    }, []);

    const onSubmit = async (data) => {
        console.log(data);
    };

    const handleClick = () => {
        document.querySelector('#fileInput').click();
    };

    return (
        <form className='ml-[200px] bg-black min-h-screen flex flex-col gap-3 items-center justify-center' onSubmit={handleSubmit(onSubmit)}>
            {
                Object.keys(user).length &&
                (
                    <>
                        <div className='flex items-center justify-center w-1/2 gap-5'>
                            <div className='flex items-center justify-center w-[200px] h-[200px] rounded-full overflow-hidden p-6 border'>
                                <img src={user.profileDetails.pfp} alt="user" />
                            </div>
                            <div>
                                <button onClick={handleClick} className="btn solid bw">
                                    Upload Profile Picture
                                </button>
                                <input
                                    type="file"
                                    {...register("pfp")}
                                    id='fileInput'
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                        <div className='flex items-center justify-center w-[400px] p-3'>
                            <label htmlFor="userName" className='text-xs text-white uppercase w-[100px]'>User Name:</label>
                            <input
                                type="text"
                                {...register("userName")}
                                placeholder={user.userName}
                                className='input success pill'
                            />
                        </div>
                        <div className='flex items-center justify-center w-[400px] p-3'>
                            <label htmlFor="userName" className='text-xs text-white uppercase w-[100px]'>Email:</label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder={user.email}
                                className='input success pill'
                            />
                        </div>
                        <div className='flex items-center justify-center w-[400px] p-3'>
                            <label htmlFor="userName" className='text-xs text-white uppercase w-[100px]'>Date Of Birth:</label>
                            <input
                                type="date"
                                {...register("dob")}
                                className='input success pill'
                            />
                        </div>
                        <div className='flex items-center justify-center w-[400px] p-3'>
                            <label htmlFor="userName" className='text-xs text-white uppercase w-[100px]'>Gender:</label>
                            <select className='select pill success' {...register("dob")} defaultValue={user.profileDetails.gender}>
                                <option value={"Male"}>
                                    Male 
                                </option>
                                <option value={"Female"}>
                                    Female
                                </option>
                            </select>
                        </div>
                        <div className='flex items-center justify-center w-[400px] p-3'>
                            <label htmlFor="userName" className='text-xs text-white uppercase w-[100px]'>About:</label>
                            <input
                                type="text"
                                {...register("about")}
                                placeholder={user.profileDetails.about}
                                className='input success pill'
                            />
                        </div>
                        <button type='submit' className='btn solid warn'>Update Changes</button>
                    </>
                )
            }
        </form>
    )
}

export default EditPage