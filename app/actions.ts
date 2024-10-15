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
