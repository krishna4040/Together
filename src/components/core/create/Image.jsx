import React, { useRef, useState } from 'react'
import { setDisplayImages, setUploadImages } from '../../../store/slices/post'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import { InfoButton, SuccessButton } from '../../ui/Button';

const Image = ({ setStep }) => {

    const [uploadImages, setUploadPostImages] = useState([]);
    const [displayPostImages, setDisplayPostImages] = useState([]);
    const dispatch = useDispatch();

    const uploadHandler = () => {
        if (!uploadImages || !displayPostImages) {
            toast.error("please provide a post image");
            return;
        }
        dispatch(setUploadImages(uploadImages));
        dispatch(setDisplayImages(displayPostImages));
        setStep("caption");
    }

    const fileInputRef = useRef(null);

    const chooseHandler = () => {
        fileInputRef.current.click();
    }

    const changeHandler = (event) => {
        const files = Array.from(event.target.files);
        setUploadPostImages(files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                setDisplayPostImages(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    }

    return (
        <div className='lg:w-[500px] w-full p-5 flex flex-col items-start justify-center gap-10'>
            <div className='flex flex-col items-start justify-center gap-5'>
                <h1 className='text-3xl font-semibold text-white'>Set Image For The Post</h1>
                <input type='file' className='hidden' ref={fileInputRef} onChange={changeHandler} multiple/>
                <div className=''>
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        autoplay
                    >
                        {
                            displayPostImages.length &&
                            displayPostImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image} alt="preview_image" width={300} height={300} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className='flex items-center justify-start gap-5'>
                    <InfoButton text="Choose" onClick={chooseHandler} />
                    <SuccessButton text="Upload" onClick={uploadHandler} />
                </div>
            </div>
            <div className='flex items-center justify-start gap-20'>
            </div>
        </div>
    )
}

export default Image