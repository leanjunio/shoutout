"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { login } from "../actions";

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

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            await login(data);
            toast({
                title: "Hooray!",
                description: `Welcome ${data.username}!`,
            });
        } catch (error) {
            if (error.message === "Invalid credentials") {
                return toast({
                    title: "Error",
                    description: "Invalid credentials. Please try again.",
                    variant: "destructive",
                });
            }
            console.log("some error occurred", error);
        }
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col row-start-2 items-center sm:items-start">
                <Form {...form}>
                    <h2 className="font-bold">Login</h2>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </main>
        </div>
    );
}
