"use server";

import { auth } from "@/auth";
import Navbar from "@/components/navbar/Navbar";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar whiteBackground={false} session={session} />
            <div className="flex-1">{children}</div>
        </div>
    );
};
export default PublicLayout;
