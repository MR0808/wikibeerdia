import VerificationForm from "@/components/auth/VerificationForm";
import AuthWrapper from "@/components/auth/AuthWrapper";

export async function generateMetadata() {
    return {
        title: "Verification",
        description: "Wikibeerdia Verification"
    };
}

const NewVerificationPage = () => {
    return (
        <AuthWrapper
            paragraph="How ever you want to say it, welcome aboard to Wikibeerdia, the best online encyclopedia for beer! Create your account now, and take advantage of being a member of the best beer community around."
            heading="Email Verification"
            subHeading=""
            backButtonString="Proceed to login"
            backButtonHref="/login"
            backButtonLabel="Login"
            showFooter={false}
        >
            <VerificationForm />
        </AuthWrapper>
    );
};

export default NewVerificationPage;
