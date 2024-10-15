import { redirect } from "next/navigation";

import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { checkAuthenticated } from "@/lib/auth";

const ForgotPasswordPage = async () => {
    const user = await checkAuthenticated()
    if (user) { redirect("/");}

    return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
