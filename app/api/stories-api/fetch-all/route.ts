import Story from "@/schema/storySchema";
import { connectToDB } from "@/utils/connectToDb";

export async function GET() {
    try {
        await connectToDB();
        const stories = await Story.find().lean();
        return new Response(JSON.stringify(stories), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Error fetching stories", err }), { status: 500 });
    }
}