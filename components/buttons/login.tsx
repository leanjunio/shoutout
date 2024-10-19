"use client";

import { goToLogin } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
    return (
        <Button onClick={() => goToLogin()} variant="outline" size="sm">
            Sign in
        </Button>
    );
}
