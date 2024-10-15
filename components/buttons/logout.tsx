"use client";

import { logout as LogoutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
    async function logout() {
        await LogoutAction();
    }

    return (
        <Button onClick={logout} variant="outline" size="sm">
            Logout
        </Button>
    );
}
