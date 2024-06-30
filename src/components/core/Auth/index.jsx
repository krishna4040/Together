import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import { toast } from 'react-hot-toast'
import { setSignupData, setToken } from '../../../store/slices/auth'
import { useDispatch } from 'react-redux'
import { Label } from "../../ui/Label";
import { Input } from "../../ui/Input";
import { cn } from "../../../utils/cn";
import { LightButton } from '../../ui/Button'
import { useNavigate } from 'react-router-dom'
import { useAxiosWithoutAuth } from '../../../hooks/useAxios'

export function SignupForm({ isSignup, setIsSignup, setIsOtpSent }) {
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });
    const { register, handleSubmit, formState, reset } = form;
    const { isSubmitSuccessful, errors } = formState;
    const dispatch = useDispatch();
    const axiosPublic = useAxiosWithoutAuth()

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const submitHandler = useCallback(async (data) => {
        try {
            if (isSignup) {
                if (data.password !== data.confirmPassword) {
                    return toast.error("Passwords do not match");
                }
                dispatch(setSignupData(data));
                const response = await axiosPublic.post(`/auth/sendotp`, { email: data.email });
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                setIsOtpSent(true)
                toast.success("OTP sent to your email!");
            } else {
                const response = await axiosPublic.post(`/auth/login`, data);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                toast.success("signed up successfully");
                sessionStorage.setItem("token", response.data.token);
                dispatch(setToken(response.data.token));
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }, [isSignup]);

    return (
        <form className="my-8" onSubmit={handleSubmit(submitHandler)}>
            {
                isSignup &&
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="userName">Username</Label>
                    <Input id="userName" placeholder="Tyler" type="text" {...register("userName", { required: "Username is required" })} />
                </LabelInputContainer>
            }
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...register("email", {
                    pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address"
                    }, required: "Email is required"
                })} />
            </LabelInputContainer>
            {
                isSignup ?
                    <div className="flex space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="••••••••" type="password" {...register("password", {
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                },
                                pattern: {
                                    value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                                    message: "Password must contain uppercase, lowercase, number, and special character",
                                },
                                required: "Password is required"
                            })} />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <Input
                                id="confirmPassword"
                                placeholder="••••••••"
                                type="confirmPassword"
                                {...register("confirmPassword")}
                            />
                        </LabelInputContainer>
                    </div> :
                    <>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="••••••••" type="password" {...register("password")} />
                        </LabelInputContainer>
                    </>
            }


            <ErrorMessage
                errors={errors}
                name="password"
                render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                    ))
                }
            />
            <ErrorMessage
                errors={errors}
                name="userName"
                render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                    ))
                }
            />
            <ErrorMessage
                errors={errors}
                name="email"
                render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                    ))
                }
            />

            <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
            >
                {isSignup ? "Signup" : "Login"} &rarr;
                <BottomGradient />
            </button>
            <LightButton type="button" text={`${isSignup ? "Login" : "Signup"} instead`} onClick={() => setIsSignup(prev => !prev)} className="w-full mt-2" />
        </form>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};