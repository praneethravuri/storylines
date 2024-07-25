import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/connectToDb';
import Story from '@/schema/storySchema';
import mongoose from 'mongoose';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const themeRoomId = url.searchParams.get('themeRoomId');

  if (!themeRoomId) {
    return new Response(JSON.stringify({ message: "Theme room Id is required" }), { status: 400 });
  }

  try {
    await connectToDB();
    
    // Convert themeRoomId to ObjectId
    const objectId = new mongoose.Types.ObjectId(themeRoomId);

    const stories = await Story.find({ themeRoomId: objectId });

    // console.log(stories)

    if (!stories) {
      return new Response(JSON.stringify({ message: "Stories not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(stories), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error fetching stories", err }), { status: 500 });
  }
}
