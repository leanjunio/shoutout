import { NextRequest } from "next/server";

export const config = {
    runtime: "edge", // Use 'nodejs' if you prefer Node.js runtime
};

export async function GET(request: NextRequest) {
    const { lat1, lng1, lat2, lng2 } = await request.json();

    const toRadians = (deg: number) => deg * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in km

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in km

    return new Response(JSON.stringify({ distance }), {
        headers: { "Content-Type": "application/json" },
    });
}
