import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

type PayloadWithUsername = JwtPayload & { username: string };

export function getUserFromToken(token: string) {
    const decoded = jwtDecode<PayloadWithUsername>(token);
    return decoded.username;
}

export function signToken(username: string) {
    return jwt.sign({ username }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    });
}
