"use client";

import { goToSignup } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function SignupButton() {
    async function signup() {
        await goToSignup();
    }

    return (
        <Button onClick={signup} variant="outline" size="sm">
            Sign up
        </Button>
    );
}
