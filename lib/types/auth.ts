import { z } from "zod";

export const formSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "username must be at least 2 characters.",
        })
        .max(50),
    password: z
        .string()
        .min(8, {
            message: "password must be at least 8 characters",
        })
        .max(30),
});

export type FormSchema = z.infer<typeof formSchema>;
