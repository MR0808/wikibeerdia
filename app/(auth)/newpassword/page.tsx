import { redirect } from "next/navigation";

import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { checkAuthenticated } from "@/lib/auth";

export async function generateMetadata() {
    return {
        title: "New Password",
        description: "Wikibeerdia New Password"
    };
}

const NewPasswordPage = async () => {
    const user = await checkAuthenticated();
    if (user) {
        redirect("/");
    }

    return <NewPasswordForm />;
};

export default NewPasswordPage;
