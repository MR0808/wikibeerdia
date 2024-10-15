import { redirect } from "next/navigation";

import RegisterForm from '@/components/auth/RegisterForm';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { checkAuthenticated } from "@/lib/auth";

const RegisterPage = async () => {
    const user = await checkAuthenticated()
    if (user) { redirect("/");}

    return (
        <AuthWrapper
            paragraph="How ever you want to say it, welcome aboard to Wikibeerdia, the best online encyclopedia for beer! Create your account now, and take advantage of being a member of the best beer community around."
            heading="Register Now!"
            subHeading="Use the form below to register your account"
            backButtonString="Already have an account?"
            backButtonHref="/login"
            backButtonLabel="Login"
        >
            <RegisterForm />
        </AuthWrapper>
    );
};

export default RegisterPage;
