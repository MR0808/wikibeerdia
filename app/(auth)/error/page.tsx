import AuthWrapper from '@/components/auth/AuthWrapper';

const ErrorPage = () => {
    return (
        <AuthWrapper
            paragraph="Always happens when you're having good beers, something can go wrong. All good, just login and let's sort this out!"
            heading="Something went wrong!"
            subHeading="Too much head or not enough, either way, let's log in and start again"
            backButtonString="Click below"
            backButtonHref="/login"
            backButtonLabel="Login"
        >
            <></>
        </AuthWrapper>
    );
};

export default ErrorPage;
