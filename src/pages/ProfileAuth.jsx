import React from 'react'
import { useForm } from 'react-hook-form'

const ProfileAuth = () => {

    const form = useForm();
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = form;

    const arr = [
        { label: 'First Name', name: 'firstName', type: 'text', placeHolder: 'Enter Your First Name' },
        { label: 'Last Name', name: 'lastName', type: 'text', placeHolder: 'Enter Your Last Name' },
        { label: 'About', name: 'about', type: 'text', placeHolder: 'Enter Your Profile Bio' },
        { label: 'Age', name: 'age', type: 'number', placeHolder: 'Enter Your Age' },
        { label: 'Gender', name: 'gender', type: 'text', placeHolder: 'Enter Your Gender' },
        { label: 'BirthDay', name: 'bday', type: 'date', placeHolder: 'Enter Your Birthday' },
        { label: 'Profile Picture', name: 'pfp', type: 'file', placeHolder: 'Upload Your Profile Picture' }
    ];

    const sumbitHandler = (data) => {
        console.log(data);
    }

    return (
        <div className='flex items-center justify-center min-h-screen gap-20 bg-gray-950'>
            <div>
                <img src="https://picsum.photos/400/600" alt="image" />
            </div>
            <form onSubmit={handleSubmit(sumbitHandler)}>
                <table className='border-separate border-spacing-5'>
                    <tbody>
                        {
                            arr.map((element, index) => {
                                return (
                                    <tr key={index}>
                                        <td><label htmlFor={element.name} className='text-xs text-white uppercase w-fit'>{element.label}</label></td>
                                        <td><input className='text-white input success lg' type={element.type} placeholder={element.placeHolder} {...register(element.name, { required: true })} /></td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td className=''><button className='btn solid success pill'>Create Profile</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default ProfileAuth