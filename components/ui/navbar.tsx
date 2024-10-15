import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "../buttons/logout";
import LoginButton from "../buttons/login";
import SignupButton from "../buttons/signup";

export default function Navbar() {
    const token = cookies().get("token");

    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-14 items-center">
                    <nav className="hidden md:flex gap-4">
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Home
                        </Link>
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            About
                        </Link>
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Services
                        </Link>
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Contact
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        {token ? (
                            <LogoutButton />
                        ) : (
                            <>
                                <LoginButton />
                                <SignupButton />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
