import { redirect } from "next/navigation";

import NewPasswordForm from '@/components/auth/NewPasswordForm';
import { checkAuthenticated } from "@/lib/auth";

const NewPasswordPage = async () => {
    const user = await checkAuthenticated()
    if (user) { redirect("/");}
    
    return <NewPasswordForm />;
};

export default NewPasswordPage;
