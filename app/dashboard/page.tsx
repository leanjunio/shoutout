"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { shoutout } from "../actions";
import { Shoutout, shoutoutSchema } from "@/lib/types/shoutout";
import { Shoutouts } from "@/components/shoutouts";

export default function Dashboard() {
    const form = useForm<Shoutout>({
        resolver: zodResolver(shoutoutSchema),
        defaultValues: {
            message: "",
        },
    });

    function onSubmit(data: Shoutout) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                await shoutout({
                    ...data,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                toast({
                    title: "Shoutout broadcasted!",
                    description: "Your message has been sent out.",
                });
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description:
                        "Your shoutout could not be broadcasted. Please try again.",
                });
            }
        });
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex gap-5 row-start-2 items-center sm:items-start w-3/4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write a message..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Send a shoutout
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Shoutout</Button>
                    </form>
                </Form>
                <div className="w-full">
                    <Shoutouts />
                </div>
            </main>
        </div>
    );
}
