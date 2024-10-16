"use server";

import { db } from "@vercel/postgres";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormSchema } from "@/lib/types/auth";
import { getUserFromToken } from "@/lib/auth";
import { ShoutoutWithCoordinates } from "@/lib/types/shoutout";

export async function signup(data: FormSchema) {
    try {
        const client = await db.connect();
        await client.sql`INSERT INTO Users (username, password) VALUES (${data.username}, ${data.password})`;
    } catch (error) {
        console.error(error);
    }
}

export async function login(data: FormSchema) {
    try {
        const client = await db.connect();
        const { rows } =
            await client.sql`SELECT * FROM Users WHERE username = ${data.username} AND password = ${data.password}`;

        if (rows.length === 0) {
            throw new Error("Invalid credentials");
        }

        const token = await jwt.sign(
            { username: data.username },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            }
        );

        cookies().set({
            name: "token",
            value: token,
            httpOnly: true,
        });

        console.log({ rows });
        return rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        redirect("/dashboard");
    }
}

export async function logout() {
    cookies().delete("token");
    redirect("/");
}

export async function goToLogin() {
    redirect("/login");
}

export async function goToSignup() {
    redirect("/");
}

export async function shoutout(data: ShoutoutWithCoordinates) {
    const token = cookies().get("token");

    if (!token) {
        throw new Error("Unauthorized");
    }

    const username = getUserFromToken(token.value);

    try {
        const client = await db.connect();
        await client.sql`
            INSERT INTO Shoutouts (username, message, longitude, latitude)
            VALUES (${username}, ${data.message}, ${data.longitude}, ${data.latitude})
        `;
    } catch (error) {
        console.error(error);
    }
}
