import { redirect } from "next/navigation";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { checkAuthenticated } from "@/lib/auth";

export async function generateMetadata() {
    return {
        title: "Forgot Password",
        description: "Wikibeerdia Forgot Password"
    };
}

const ForgotPasswordPage = async () => {
    const user = await checkAuthenticated();
    if (user) {
        redirect("/");
    }

    return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
