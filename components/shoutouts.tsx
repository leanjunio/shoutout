import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchShoutouts } from "@/app/actions";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ReceivedShoutout } from "@/lib/types/shoutout";

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
            <TableCaption>Shouts nearest to you</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Shout</TableHead>
                    <TableHead>Distance</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {shouts.map((shout, i) => {
                    const distance =
                        shout.distance_meters < 1
                            ? "< 1 km"
                            : new Intl.NumberFormat("en-US", {
                                  style: "unit",
                                  unit: "kilometer",
                              }).format(shout.distance_meters);
                    return (
                        <TableRow key={i}>
                            <TableCell>{shout.message}</TableCell>
                            <TableCell>{distance}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
