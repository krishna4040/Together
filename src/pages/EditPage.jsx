import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { setToken } from '../store/slices/auth'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../components/common/DeleteModal'
import { updateProfile } from '../store/slices/user';
import { ErrorButton, InfoButton } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { useAxiosWithAuth } from '../hooks/useAxios';

const EditPage = () => {
    const { register, handleSubmit, formState: { isSubmitSuccessful }, reset } = useForm({
        defaultValues: {
            userName: "",
            email: "",
            dob: "",
            gender: "",
            pfp: null
        }
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const axiosPrivate = useAxiosWithAuth();

    const submitHandler = async (data) => {
        try {
            !data.pfp.length ? delete data.pfp : data.pfp = data.pfp[0];
            const res = await axiosPrivate.put('/user/updateProfile', data)
            if (!res.data.success) {
                throw new Error(res.data.message);
            }
            dispatch(updateProfile(res.data.data))
            toast.success("profile updated");
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    };

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);

    const handleClick = () => {
        document.querySelector('#fileInput').click();
    };

    const deleteProfileHandler = async () => {
        try {
            const { data } = await axiosPrivate.delete('/user/deleteUser');
            if (data.success) {
                toast.error("profile deleted");
                dispatch(setToken(null));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [modal, setModal] = useState(false);

    return (
        <form className='lg:ml-[200px] bg-black min-h-screen flex flex-col gap-3 items-center justify-start lg:justify-center' onSubmit={handleSubmit(submitHandler)}>
            {
                <>
                    <div className='flex flex-col items-center justify-center w-1/2 gap-5 mt-10 lg:flex-row lg:mt-0'>
                        <Avatar src={user.profileDetails.pfp} w={200} h={200} />
                        <div>
                            <InfoButton onClick={handleClick} type={"button"} text={"Update Profile Picture"} />
                            <input
                                type="file"
                                {...register("pfp")}
                                id='fileInput'
                                style={{ display: 'none' }}
                                accept='.png , .jpg , .jpeg , .svg , .gif , .ico , .svg'
                            />
                        </div>
                    </div>
                    <div className='flex items-center justify-center w-[400px] p- mt-10 lg:mt-0'>
                        <label htmlFor="userName" className='text-xs text-white uppercase w-[150px]'>Username:</label>
                        <input
                            type="text"
                            placeholder={user.userName}
                            className='input success pill'
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
                            type="date"
                            placeholder={user.profileDetails.dob}
                            className='input success pill'
                        />
                    </div>
                    <div className='flex items-center justify-center w-[400px] p-3'>
                        <label htmlFor="userName" className='text-xs text-white uppercase w-[150px]'>Gender:</label>
                        <select className='select pill success' defaultValue={user.profileDetails.gender}>
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
                    <div className='flex items-center justify-start gap-5 mt-10 lg:mt-5 w-[400px]'>
                        <InfoButton type={"submit"} text={"Update Profile"} />
                        <ErrorButton type={"button"} onClick={() => setModal(true)} text={"Delete Profile"} />
                    </div>
                </>
            }
            {modal && <DeleteModal setModal={setModal} deleteHandler={deleteProfileHandler} />}
        </form>
    )
}

export default EditPage