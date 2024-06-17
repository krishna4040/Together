import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { setSignupData } from '../../../store/slices/auth'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Label } from "../../ui/Label";
import { Input } from "../../ui/Input";
import { cn } from "../../../utils/cn";
import { Button } from '../../ui/Button'

export function SignupForm({ isSignup, setIsSignup }) {

    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });
    const { register, handleSubmit, formState, reset } = form;
    const { isSubmitSuccessful, errors } = formState;
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const submitHandler = useCallback(async (data) => {
        try {
            if (isSignup) {
                dispatch(setSignupData(data));
                const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/sendotp`, { email: data.email });
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
            } else {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                toast.success("signed up successfully");
                sessionStorage.setItem("token", response.data.token);
                dispatch(setToken(response.data.token));
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, []);

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Together
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                {isSignup ? "Signup" : "Login"} to Together to start your journey
            </p>
            <form className="my-8" onSubmit={handleSubmit(submitHandler)}>
                {
                    isSignup ?
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="firstname">First name</Label>
                                <Input id="firstname" placeholder="Tyler" type="text" {...register("firstname")} />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="lastname">Last name</Label>
                                <Input id="lastname" placeholder="Durden" type="text" {...register("lastname")} />
                            </LabelInputContainer>
                        </div> :
                        <></>
                }
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...register("email")} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" {...register("password")} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-8">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                        id="confirmPassword"
                        placeholder="••••••••"
                        type="confirmPassword"
                        {...register("confirmPassword")}
                    />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    {isSignup ? "Signup" : "Login"} &rarr;
                    <BottomGradient />
                </button>

                <Button type="button" text={`${isSignup ? "Login" : "Signup"} instead`} onClick={() => setIsSignup(prev => !prev)} className="w-full mt-2" />
            </form>
        </div>
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
