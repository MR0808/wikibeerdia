"use server";

import getSession from "@/lib/session";
import Navbar from "@/components/navbar/Navbar";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getSession();

    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar whiteBackground={true} session={session} blackText={true} />
            <div className="flex-1">{children}</div>
        </div>
    );
};
export default PublicLayout;
