import { Request, Response } from "express";
import * as storyService from "../../services/v1/storyService";
import mongoose from "mongoose";


// http://localhost:5000/api/v1/stories
export const fetchAllStories = async (req: Request, res: Response): Promise<void> => {
  try {
    const stories = await storyService.fetchAllStories();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stories", error });
  }
}

// http://localhost:5000/api/v1/stories/{storyId}
export const fetchSingleStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storyId } = req.params;
    const story = await storyService.fetchSingleStory(storyId);
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: "Error locating story", error });
  }
}

// http://localhost:5000/api/v1/stories
export const createStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, type, content, authorId, themeRoomId, prev } = req.body;
    const story = await storyService.createStory({
      title,
      type: type || "child",
      content,
      authorId : new mongoose.Types.ObjectId(authorId),
      themeRoomId: new mongoose.Types.ObjectId(themeRoomId),
      prev: prev ? prev.map((id: string) => new mongoose.Types.ObjectId(id)) : []
    });
    res.status(201).json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating story', error });
  }
};

// http://localhost:5000/api/v1/stories/theme-rooms
export const fetchStoriesByThemeRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const storiesByThemeRooms = await storyService.fetchStoriesByThemeRooms();
    res.json(storiesByThemeRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stories by theme rooms', error });
  }
}

// http://localhost:5000/api/v1/stories/theme-rooms/{themeRoomId}
export const fetchStoriesByThemeRoomId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { themeRoomId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(themeRoomId)) {
      res.status(400).json({ message: 'Invalid themeRoomId' });
      return;
    }
    const stories = await storyService.fetchStoriesByThemeRoomId(themeRoomId);
    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stories for theme room', error });
  }
}

// http://localhost:5000/api/v1/stories/{storyId}
export const deleteSingleStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storyId } = req.params;

    await storyService.deleteSingleStory(storyId);
    res.status(200).json({ message: "Story successfully deleted" });
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message === "Story not found") {
      res.status(404).json({ message: error.message });
    } else if(error instanceof Error && error.message === "Cannot delete linked stories"){
      res.status(422).json({message: error.message})

    } else {
      res.status(500).json({ message: 'Error while deleting story', error });
    }
  }
}

// http://localhost:5000/api/v1/stories/{storyId}
export const editStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storyId } = req.params;
    const { title, content } = req.body;

    // Validate storyId
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      res.status(400).json({ message: "Invalid story ID" });
      return;
    }

    // Create an object with only the fields that are present
    const updateData: { title?: string, content?: string } = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ message: "No valid fields to update" });
      return;
    }

    await storyService.editStory(updateData, new mongoose.Types.ObjectId(storyId));

    res.status(200).json({ message: "Story updated successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "Story not found") {
      res.status(404).json({ message: "Story not found" });
    } else {
      console.error("Error editing story:", error);
      res.status(500).json({ message: "An error occurred while editing the story" });
    }
  }
};

// http://localhost:5000/api/v1/stories/filtered
export const fetchFilteredStories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storyIds } = req.body;

    // Validate input
    if (!Array.isArray(storyIds) || storyIds.length === 0) {
      res.status(400).json({ message: "Invalid or empty storyIds array" });
      return;
    }

    // Convert string IDs to ObjectIds
    const currentIds = storyIds.map(id => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid story ID: ${id}`);
      }
      return new mongoose.Types.ObjectId(id);
    });

    const stories = await storyService.fetchFilteredStories(currentIds);

    // Check if any stories were found
    if (stories.length === 0) {
      res.status(404).json({ message: "No stories found for the provided IDs" });
      return;
    }

    res.status(200).json(stories);
  } catch (error) {
    console.error("Error in fetchFilteredStories:", error);
    if (error instanceof Error && error.message.startsWith("Invalid story ID:")) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error occurred while fetching filtered stories", error: error instanceof Error ? error.message : String(error) });
    }
  }
};