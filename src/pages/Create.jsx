import React, { useEffect, useState } from 'react';

import Title from '../components/core/create/Title'
import Image from '../components/core/create/Image'
import Caption from '../components/core/create/Caption'
import Preview from '../components/core/create/Preview'

function Create() {

    const [step, setStep] = useState('title');

    return (
        <div className="min-w-screen ml-[200px] min-h-screen bg-black p-10 flex flex-col items-center justify-start gap-20">
            <div className='steps success top'>
                <div className={`step text-white ${step === 'title' ? 'active' : null}`}>
                    Title
                </div>
                <div className={`step text-white ${step === 'image' ? 'active' : null}`}>
                    Image
                </div>
                <div className={`step text-white ${step === 'caption' ? 'active' : null}`}>
                    Caption
                </div>
                <div className={`step text-white ${step === 'preview' ? 'active' : null}`}>
                    Preview
                </div>
            </div>
            {step === 'title' && <Title setStep={setStep} />}
            {step === 'image' && <Image setStep={setStep} />}
            {step === 'caption' && <Caption setStep={setStep} />}
            {step === 'preview' && <Preview setStep={setStep} />}
        </div>
    );
}

export default Create;