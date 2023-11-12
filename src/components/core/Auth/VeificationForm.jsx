import React from 'react'
import { useSelector } from 'react-redux'

const VeificationForm = () => {

    const { signupData } = useSelector(state => state.auth);

    return (
        <div>
            <p>An OTP has been sent to your email account {signupData.email}</p>

        </div>
    )
}

export default VeificationForm