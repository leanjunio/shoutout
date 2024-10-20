"use server";

import { db } from "@vercel/postgres";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormSchema } from "@/lib/types/auth";
import { getUserFromToken, signToken } from "@/lib/auth";
import {
    ReceivedShoutout,
    ShoutoutWithCoordinates,
} from "@/lib/types/shoutout";

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

        const token = signToken(data.username);

        cookies().set({
            name: "token",
            value: token,
            httpOnly: true,
        });

        redirect("/dashboard");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function logout() {
    cookies().delete("token");
    redirect("/login");
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

export async function fetchShoutouts(data: {
    latitude: number;
    longitude: number;
}) {
    try {
        const client = await db.connect();
        const { rows } = await client.sql`SELECT 
            message,
            ST_Distance(
                ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography, 
                ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326)::geography
            ) AS distance_meters
            FROM shoutouts
            ORDER BY ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography <-> ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326)::geography
            LIMIT 10;`;
        return rows as ReceivedShoutout[];
    } catch (error) {
        console.error(error);
    }
}
