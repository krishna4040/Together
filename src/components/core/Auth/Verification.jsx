import { Box } from "@mui/system";
import { LightButton, DarkButton, BackButton } from '../../ui/Button';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { OTP } from "../../ui/OTPInput";
import { useState } from "react";
import { useAxiosWithoutAuth } from "../../../hooks/useAxios";

export default function Verification({ setIsOtpSent }) {
    const [otp, setOtp] = useState('');
    const signupData = useSelector(state => state.auth)
    const axiosPublic = useAxiosWithoutAuth()

    const connectHandler = async () => {
        try {
            const response = await axiosPublic.post(`/auth/signup`, {
                email: signupData.email,
                password: signupData.password,
                otp: otp
            });
            if (!response.data.success) {
                toast.error(response.data.message);
            }
            setUserId(response.data.data._id);
            toast.success('signed up successfully');
            setTab('profile');
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const resendHandler = async () => {
        try {
            const response = await axiosPublic.post(`/auth/sendotp`, { email: signupData.email });
            if (response.data.success) {
                toast.success("otp resent successfully");
            }
        } catch ({ response }) {
            toast.error(response.data.message);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: '25px'
            }}
        >
            <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={5} />
            <DarkButton text={"Verify"} onClick={connectHandler} />
            <LightButton text={"Resend OTP"} onClick={resendHandler} />
            <BackButton onClick={() => setIsOtpSent(false)} />
        </Box>
    );
}
