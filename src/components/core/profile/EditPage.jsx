import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useForm } from 'react-hook-form';

const EditPage = () => {

    const { register, handleSubmit, formState: { errors , isSubmitSuccessful } , reset } = useForm();
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

    const updatePfp = async (pfp) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}updatePfp`, { pfp }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const updateAbout = async (about) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}updateAbout`, { about }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const sumbitHandler = (data) => {
        if (data.pfp) {
            updatePfp(data.pfp[0]);
            console.log(data.pfp[0]);
        }
        if (data.about) {
            updateAbout(data.about);
            console.log(data.about);
        }
    };

    useEffect(() => {
        reset();
    },[isSubmitSuccessful]);

    const handleClick = () => {
        document.querySelector('#fileInput').click();
    };

    return (
        <form className='ml-[200px] bg-black min-h-screen flex flex-col gap-3 items-center justify-center' onSubmit={handleSubmit(sumbitHandler)}>
            {
                Object.keys(user).length &&
                (
                    <>
                        <div className='flex items-center justify-center w-1/2 gap-5'>
                            <div className='flex items-center justify-center w-[200px] h-[200px] rounded-full overflow-hidden p-6 border'>
                                <img src={user.profileDetails.pfp} alt="user" />
                            </div>
                            <div>
                                <button onClick={handleClick} className="btn solid bw" type='button'>
                                    Update Profile Picture
                                </button>
                                <input
                                    type="file"
                                    {...register("pfp")}
                                    id='fileInput'
                                    style={{ display: 'none' }}
                                    accept='.png , .jpg , .jpeg , .svg , .gif , .ico , .svg'
                                />
                            </div>
                        </div>
                        <div className='flex items-center justify-center w-[400px] p-3'>
                            <label htmlFor="userName" className='text-xs text-white uppercase w-[150px]'>User Name:</label>
                            <input
                                type="text"
                                placeholder={user.userName}
                                className='input success pill'
                                disabled
                            />
                        </div>
                        <div className='flex items-center justify-center w-[400px] p-3'>
                            <label htmlFor="userName" className='text-xs text-white uppercase w-[150px]'>Email:</label>
                            <input
                                type="email"
                                placeholder={user.email}
                                className='input success pill'
                                disabled
                            />
                        </div>
                        <div className='flex items-center justify-center w-[400px] p-3'>
                            <label htmlFor="userName" className='text-xs text-white uppercase w-[150px]'>Date Of Birth:</label>
                            <input
                                type="text"
                                placeholder={user.profileDetails.dob}
                                className='input success pill'
                                disabled
                            />
                        </div>
                        <div className='flex items-center justify-center w-[400px] p-3'>
                            <label htmlFor="userName" className='text-xs text-white uppercase w-[150px]'>Gender:</label>
                            <select className='select pill success' defaultValue={user.profileDetails.gender} disabled>
                                <option value={"Male"}>
                                    Male
                                </option>
                                <option value={"Female"}>
                                    Female
                                </option>
                            </select>
                        </div>
                        <div className='flex items-center justify-center w-[400px] p-3'>
                            <label htmlFor="userName" className='text-xs text-white uppercase w-[150px]'>About:</label>
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