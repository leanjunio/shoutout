"use client";

import { goToLogin } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
    async function logout() {
        await goToLogin();
    }

    return (
        <Button onClick={logout} variant="outline" size="sm">
            Sign in
        </Button>
    );
}
