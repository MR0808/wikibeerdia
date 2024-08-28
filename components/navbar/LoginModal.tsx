'use client';

import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const LoginModal = () => {
    const [login, setLogin] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex rounded text-sm sm:text-md h-11 border border-primary p-2"
                    >
                        Login / Signup
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            {login ? 'Welcome Back' : 'Register Now!'}
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            {login
                                ? 'Use the form below to log in to your account'
                                : 'Use the form below to register your account'}
                        </DialogDescription>
                    </DialogHeader>
                    {login ? <LoginForm /> : <RegisterForm />}
                    <DialogFooter className="text-center sm:justify-center">
                        <p className="flex flex-col items-center justify-center text-center text-md text-gray-500">
                            <span>
                                {login
                                    ? "Don't have an account?"
                                    : 'Already have an account?'}
                            </span>
                            <div
                                onClick={() => setLogin(!login)}
                                className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                            >
                                {login ? 'Register' : 'Login'}
                            </div>
                        </p>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default LoginModal;
