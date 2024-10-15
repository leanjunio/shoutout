"use server";

import { z } from "zod";
import { formSchema } from "./page";
import { db } from "@vercel/postgres";

export async function signup(data: z.infer<typeof formSchema>) {
    try {
        const client = await db.connect();
        await client.sql`INSERT INTO Users (username, password) VALUES (${data.username}, ${data.password})`;
    } catch (error) {
        console.error(error);
    }
}

export async function login(data: z.infer<typeof formSchema>) {
    try {
        const client = await db.connect();
        const { rows } =
            await client.sql`SELECT * FROM Users WHERE username = ${data.username} AND password = ${data.password}`;

        if (rows.length === 0) {
            throw new Error("Invalid credentials");
        }

        return rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}
