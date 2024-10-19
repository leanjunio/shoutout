import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { db, QueryResultRow } from "@vercel/postgres";
import { fetchShoutouts } from "@/app/actions";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ReceivedShoutout, receivedShoutoutSchema } from "@/lib/types/shoutout";

export function Shoutouts() {
    const [shouts, setShouts] = useState<ReceivedShoutout[]>([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                console.log({ ...position.coords });
                const rows = await fetchShoutouts({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

                if (!rows) {
                    return null;
                }

                console.log({ rows });

                setShouts(rows);
            } catch (error) {
                console.error(error);
            }
        });
    }, []);

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Username</TableHead>
                    <TableHead>Shout</TableHead>
                    <TableHead>Distance</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {shouts.map((shout, i) => {
                    console.log(shout.distance_meters);

                    console.log({
                        shout: new Intl.NumberFormat("en-US", {
                            style: "unit",
                            unit: "kilometer",
                        }).format(shout.distance_meters),
                    });

                    return (
                        <TableRow key={i}>
                            <TableCell className="font-medium">
                                {shout.username}
                            </TableCell>
                            <TableCell>{shout.message}</TableCell>
                            <TableCell>
                                {new Intl.NumberFormat("en-US", {
                                    style: "unit",
                                    unit: "kilometer",
                                }).format(shout.distance_meters)}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
