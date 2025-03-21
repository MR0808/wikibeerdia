import { redirect } from "next/navigation";

import LoginForm from "@/components/auth/LoginForm";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { checkAuthenticated } from "@/lib/auth";

export async function generateMetadata() {
    return {
        title: "Login",
        description: "Wikibeerdia Login"
    };
}

const LoginPage = async () => {
    const user = await checkAuthenticated();
    if (user) {
        redirect("/");
    }

    return (
        <AuthWrapper
            paragraph="How ever you want to say it, welcome aboard to Wikibeerdia, the best online encyclopedia for beer! Create your account now, and take advantage of being a member of the best beer community around."
            heading="Welcome Back!"
            subHeading="Use the form below to log in to your account"
            backButtonString="Don't have an account yet?"
            backButtonHref="/register"
            backButtonLabel="Register"
            showSocial={true}
        >
            <LoginForm />
        </AuthWrapper>
    );
};

export default LoginPage;
