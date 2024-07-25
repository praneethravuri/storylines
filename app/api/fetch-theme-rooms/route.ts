import ThemeRoom from "@/schema/themeRoomSchema";
import { connectToDB } from "@/utils/connectToDb";

export async function GET() {
    try {
        await connectToDB();
        const themeRooms = await ThemeRoom.find().lean();
        return new Response(JSON.stringify(themeRooms), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Error fetching theme rooms", err }), { status: 500 });
    }
}