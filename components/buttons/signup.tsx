"use client";

import { goToSignup } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default function SignupButton() {
    return (
        <Button onClick={() => goToSignup()} variant="outline" size="sm">
            Sign up
        </Button>
    );
}
