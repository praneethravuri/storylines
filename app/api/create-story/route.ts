import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/connectToDb';
import Story from '@/schema/storySchema';

export async function POST(req: NextRequest) {
    try {
        const { title, content, prev, next } = await req.json();

        // Connect to the database
        await connectToDB();

        // Create a new story
        const newStory = new Story({
            title,
            author: 'Anonymous',
            content,
            prev : [],
            next : []
        });

        // Save the story to the database
        await newStory.save();

        // Return a success response
        return NextResponse.json({ message: 'Story created successfully', story: newStory }, { status: 201 });
    } catch (error) {
        console.error('Error creating story:', error);
        return NextResponse.json({ message: 'Error creating story' }, { status: 500 });
    }
}