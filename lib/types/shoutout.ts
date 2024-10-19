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

const coordinatesSchema = z.object({
    longitude: z.number(),
    latitude: z.number(),
});

export const receivedShoutoutSchema = z.object({
    longitude: z.number(),
    latitude: z.number(),
    username: z.string(),
    message: z.string(),
    distance_meters: z.number(),
});

export type ReceivedShoutout = z.infer<typeof receivedShoutoutSchema>;

export const shoutoutWithCoordinates = shoutoutSchema.merge(coordinatesSchema);

export type ShoutoutWithCoordinates = z.infer<typeof shoutoutWithCoordinates>;
