import ThemeRoom from "@/schema/themeRoomSchema";
import { connectToDB } from "@/utils/connectToDb";
import mongoose from 'mongoose';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const themeRoomId = url.searchParams.get('themeRoomId');

    if (!themeRoomId) {
        return new Response(JSON.stringify({ message: "Theme room id is required" }), { status: 400 });
    }

    try {
        await connectToDB();
        const objectId = new mongoose.Types.ObjectId(themeRoomId);
        const themeRoom = await ThemeRoom.findOne({ _id: objectId }).lean();
        console.log(`Theme room: ${JSON.stringify(themeRoom)}`)

        if (!themeRoom) {
            return new Response(JSON.stringify({ message: "Theme room not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(themeRoom), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Error fetching theme room", err }), { status: 500 });
    }
}
