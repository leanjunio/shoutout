"use server";

import { z } from "zod";
import { formSchema } from "./page";
import { db } from "@vercel/postgres";

export async function signup(data: z.infer<typeof formSchema>) {
    try {
        console.log({ data });
        const client = await db.connect();
        const response =
            await client.sql`INSERT INTO Users (username, password) VALUES (${data.username}, ${data.password})`;

        return response;
    } catch (error) {
        console.error(error);
    }
}
