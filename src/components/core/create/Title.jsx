import React, { useState } from 'react'
import { setTitle } from '../../../store/slices/post'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast';

const Title = ({ setStep }) => {

    const [postTitle, setPostTitle] = useState('');
    const dispacth = useDispatch();

    const clickHandler = () => {
        if (!postTitle) {
            toast.error("Please select a title");
            return;
        }
        dispacth(setTitle(postTitle));
        setStep("image");
    }

    return (
        <div className='lg:w-[500px] w-full p-5 flex flex-col items-start justify-center gap-10'>
            <div className='flex flex-col items-start justify-center gap-5'>
                <h1 className='text-3xl font-semibold text-white'>Set Title For The Post</h1>
                <input className='input success xl' placeholder='Enter Title of Your Post' onChange={(event) => { setPostTitle(event.target.value) }} />
                <button className='bn5' onClick={clickHandler}>Next</button>
            </div>
            <div className='flex items-center justify-start gap-20'>
                <ul className='text-lg text-white list-disc'>
                    <li>Create a New Post</li>
                    <li>Share Your Thoughts</li>
                    <li>Craft Your Post</li>
                    <li>Post Creation Center</li>
                    <li>What's on Your Mind?</li>
                    <li>Begin Your Post</li>
                    <li>Express Yourself</li>
                    <li>Start a Discussion</li>
                    <li>Tell Your Story</li>
                </ul>
                <ul className='hidden text-lg text-white list-disc lg:block'>
                    <li>Create a New Post</li>
                    <li>Share Your Thoughts</li>
                    <li>Craft Your Post</li>
                    <li>Post Creation Center</li>
                    <li>What's on Your Mind?</li>
                    <li>Begin Your Post</li>
                    <li>Express Yourself</li>
                    <li>Start a Discussion</li>
                    <li>Tell Your Story</li>
                </ul>
            </div>
        </div>
    )
}

export default Title