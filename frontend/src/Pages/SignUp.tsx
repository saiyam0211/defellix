import React from 'react'
import { Link } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
    IconBrandGithub,
    IconBrandGoogle,

} from "@tabler/icons-react";
import { FaLinkedin } from "react-icons/fa6";

export default function SignUp() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        <div className="min-h-screen w-full bg-[#fbf9f1] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 scrBar">
            <div className="shadow-input mx-auto w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg rounded-none sm:rounded-lg md:rounded-2xl bg-white p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-800 dark:text-black mb-2 sm:mb-4">
                    SignUp
                </h2>
                <form className="my-4 sm:my-6 md:my-8" onSubmit={handleSubmit}>
                    <div className="mb-3 sm:mb-4  flex flex-col space-y-2 sm:space-y-3 md:flex-row md:space-y-0 md:space-x-2 lg:space-x-3">
                        <LabelInputContainer>
                            <Label htmlFor="firstname" className="text-black  text-sm sm:text-base">First name</Label>
                            <div className="relative group overflow-hidden rounded-md">
                                <div className="absolute inset-0 rounded-md bg-teal-600 opacity-0 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none"></div>
                                <Input id="firstname" placeholder="Tyler" type="text" className="relative z-10 text-black hover:border-teal-500 transition-all duration-300 text-sm sm:text-base h-9 sm:h-10 md:h-11" />
                            </div>
                        </LabelInputContainer>
                        <LabelInputContainer className="text-black">
                            <Label htmlFor="lastname" className="text-black text-sm sm:text-base">Last name</Label>
                            <div className="relative group overflow-hidden rounded-md">
                                <div className="absolute inset-0 rounded-md bg-teal-600 opacity-0 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none"></div>
                                <Input id="lastname" placeholder="Durden" type="text" className="relative z-10 border border-black hover:border-teal-500 transition-all duration-300 text-sm sm:text-base h-9 sm:h-10 md:h-11" />
                            </div>
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-3 sm:mb-4 text-black">
                        <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                        <div className="relative group overflow-hidden rounded-md">
                            <div className="absolute inset-0 rounded-md bg-teal-600 opacity-0 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none"></div>
                            <Input id="email" placeholder="project@gmail.com" type="email" className="relative z-10 border border-black hover:border-teal-500 transition-all duration-300 text-sm sm:text-base h-9 sm:h-10 md:h-11" />
                        </div>
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-3 sm:mb-4 text-black">
                        <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
                        <div className="relative group overflow-hidden rounded-md">
                            <div className="absolute inset-0 rounded-md bg-teal-600 opacity-0 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none"></div>
                            <Input id="password" placeholder="••••••••" type="password" className="relative z-10 border border-black hover:border-teal-500 transition-all duration-300 text-sm sm:text-base h-9 sm:h-10 md:h-11" />
                        </div>
                    </LabelInputContainer>


                    <button
                        className="group/btn relative block h-10 sm:h-11 md:h-12 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-sm sm:text-base text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-teal-800 dark:from-teal-900 dark:to-teal-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                        type="submit"
                    >
                        Get Started &rarr;
                        <BottomGradient />
                    </button>

                    <div className="my-6 sm:my-7 md:my-8 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

                    <div className="flex flex-col space-y-3 sm:space-y-4">
                        <button
                            className="group/btn shadow-input relative flex h-10 sm:h-11 md:h-12 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-3 sm:px-4 font-medium text-xs sm:text-sm text-black dark:bg-teal-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                            type="submit"
                        >
                            <IconBrandGithub className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                                GitHub
                            </span>
                            <BottomGradient />
                        </button>
                        <button
                            className="group/btn shadow-input relative flex h-10 sm:h-11 md:h-12 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-3 sm:px-4 font-medium text-xs sm:text-sm text-black dark:bg-teal-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                            type="submit"
                        >
                            <IconBrandGoogle className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                                Google
                            </span>
                            <BottomGradient />
                        </button>
                        <button
                            className="group/btn shadow-input relative flex h-10 sm:h-11 md:h-12 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-3 sm:px-4 font-medium text-xs sm:text-sm text-black dark:bg-teal-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                            type="submit"
                        >
                            <FaLinkedin className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                                Linkedin
                            </span>
                            <BottomGradient />
                        </button>
                        <Link to="/login" className="no-underline text-black text-center text-xs sm:text-sm md:text-base">
                            Already have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};



