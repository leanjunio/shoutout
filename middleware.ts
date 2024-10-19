import { getUserFromToken } from "@/lib/auth";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const currentUser = token ? getUserFromToken(token) : null;

    if (!currentUser && request.nextUrl.pathname.startsWith("/dashboard")) {
        return Response.redirect(new URL("/login", request.url));
    }

    if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
        return Response.redirect(new URL("/dashboard", request.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
