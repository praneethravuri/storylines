import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/connectToDb';
import ThemeRoom from '@/schema/themeRoomSchema';

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const body = await request.json();
    const { name, description, tags } = body;

    if (!name || !description || !tags || !Array.isArray(tags)) {
      return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
    }

    const newThemeRoom = new ThemeRoom({
      name,
      description,
      tags
    });

    const savedThemeRoom = await newThemeRoom.save();

    return NextResponse.json({
      message: 'Theme room created successfully',
      themeRoom: savedThemeRoom
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating theme room:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}