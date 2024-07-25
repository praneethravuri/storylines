import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/connectToDb';
import Story from '@/schema/storySchema';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const { title, content, prev, next, type, themeRoomId } = await req.json();

    // Connect to the database
    await connectToDB();

    const customId = uuidv4();

    // Validate themeRoomId
    let validThemeRoomId;
    try {
      validThemeRoomId = new mongoose.Types.ObjectId(themeRoomId);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid themeRoomId' }, { status: 400 });
    }

    // Create a new story
    const newStory = new Story({
      title,
      author: 'Anonymous',
      content,
      prev,
      next: [],
      type: type || "child", // default to 'child' if not specified
      customId,
      themeRoomId: validThemeRoomId
    });

    // Save the story to the database
    await newStory.save();

    // If there's a parent story, update its 'next' array
    if (prev && prev.length > 0) {
      const parentId = prev[0];
      await Story.findOneAndUpdate(
        { customId: parentId },
        { $push: { next: customId } }
      );
    }

    // Return a success response
    return NextResponse.json({ message: 'Story created successfully', story: newStory }, { status: 201 });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json({ message: 'Error creating story' }, { status: 500 });
  }
}
