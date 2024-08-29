import LoginForm from '@/components/auth/LoginForm';
import AuthWrapper from '@/components/auth/AuthWrapper';

const LoginPage = () => {
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
