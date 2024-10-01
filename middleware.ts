import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    adminPrefix,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const role = req.auth?.user.role;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix);

    const headers = new Headers(req.headers);
    headers.set("x-current-path", req.nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }

    if (isAdminRoute) {
        if (!isLoggedIn) {
            let callbackUrl = nextUrl.pathname;
            if (nextUrl.search) {
                callbackUrl += nextUrl.search;
            }

            const encodedCallbackUrl = encodeURIComponent(callbackUrl);

            return Response.redirect(
                new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
            );
        }
        if (isLoggedIn && role !== "ADMIN") {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(
            new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
        );
    }

    return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export function middleware(request: NextRequest) {
//     // Add a new header x-current-path which passes the path to downstream components
//     const headers = new Headers(request.headers);
//     headers.set('x-current-path', request.nextUrl.pathname);
//     return NextResponse.next({ headers });
// }
