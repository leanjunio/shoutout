import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

type PayloadWithUsername = JwtPayload & { username: string };

export function getUserFromToken(token: string) {
    const decoded = jwtDecode<PayloadWithUsername>(token);
    return decoded.username;
}
