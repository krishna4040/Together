import React, { useRef, useState } from 'react'
import { setImage } from '../../../store/slices/post'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Image = ({ setStep }) => {

    const [postImage, setPostImage] = useState(null);
    const dispacth = useDispatch();

    const clickHandler = () => {
        if (!postImage) {
            toast.error("please provide a post image");
            return;
        }
        dispacth(setImage(postImage));
        setStep("caption");
    }

    const fileInputRef = useRef(null);

    const chooseHandler = () => {
        fileInputRef.current.click();
    }

    const changeHandler = (event) => {
        const selectedImage = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPostImage(reader.result);
        };
        reader.readAsDataURL(selectedImage);
    }

    return (
        <div className='w-[500px] p-5 flex flex-col items-start justify-center gap-10'>
            <div className='flex flex-col items-start justify-center gap-5'>
                <h1 className='text-3xl font-semibold text-white'>Set Title For The Post</h1>
                <input type='file' className='hidden' ref={fileInputRef} onChange={changeHandler} />
                <div className=''>
                    <img src={postImage} alt="preview_Image" />
                </div>
                <div className='flex items-center justify-start gap-5'>
                    <button className='bn29' onClick={chooseHandler}>Choose</button>
                    <button className='bn5' onClick={clickHandler}>Upload</button>
                </div>
            </div>
            <div className='flex items-center justify-start gap-20'>
            </div>
        </div>
    )
}

export default Image