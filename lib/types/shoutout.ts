import { z } from "zod";

export type Shoutout = z.infer<typeof shoutoutSchema>;
export const shoutoutSchema = z.object({
    message: z
        .string()
        .min(10, {
            message: "Message must be at least 10 characters.",
        })
        .max(100, {
            message: "Must must not be longer than 100 characters.",
        }),
});

export const shoutoutWithCoordinates = shoutoutSchema.merge(
    z.object({
        longitude: z.number(),
        latitude: z.number(),
    })
);

export type ShoutoutWithCoordinates = z.infer<typeof shoutoutWithCoordinates>;
