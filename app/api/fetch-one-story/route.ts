import Story from "@/schema/storySchema";
import { connectToDB } from "@/utils/connectToDb";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const storyId = url.searchParams.get('storyId');

    if (!storyId) {
        return new Response(JSON.stringify({ message: "Story ID is required" }), { status: 400 });
    }

    try {
        await connectToDB();
        const story = await Story.findOne({ customId: storyId }).lean();

        if (!story) {
            return new Response(JSON.stringify({ message: "Story not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(story), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Error fetching story", err }), { status: 500 });
    }
}
