import Story, { IStory } from "../../models/Story";
import ThemeRoom, { IThemeRoom } from "../../models/ThemeRoom";
import mongoose from "mongoose";

// http://localhost:5000/api/v1/stories
export const fetchAllStories = async (): Promise<IStory[]> => {
    return Story.find().sort({ createdAt: -1 });
}

// http://localhost:5000/api/v1/stories/{storyId}
export const fetchSingleStory = async (id: string): Promise<IStory | null> => {
    const currId = new mongoose.Types.ObjectId(id);
    return Story.findById(currId);
}

// http://localhost:5000/api/v1/stories
export const createStory = async (storyData: Partial<IStory>): Promise<IStory> => {
    const _id = new mongoose.Types.ObjectId();
    const newStory: Partial<IStory> = {
        _id,
        ...storyData,
        prev: storyData.prev ? (Array.isArray(storyData.prev) ? storyData.prev : [storyData.prev]) : [],
        next: [],
        customId: storyData.customId || new mongoose.Types.ObjectId().toString() // Ensure unique customId
    };
    // Ensure 'prev' is always an array
    newStory.prev = newStory.prev || [];
    if (newStory.prev.length > 0) {
        newStory.prev = newStory.prev.map(id => new mongoose.Types.ObjectId(id));
        // Update the 'next' field of the previous stories
        for (const prevStoryId of newStory.prev) {
            const prevStory = await fetchSingleStory(prevStoryId.toString());
            if (prevStory) {
                prevStory.next = prevStory.next || [];
                prevStory.next.push(_id);
                await prevStory.save();
            }
        }
    }
    const story = new Story(newStory);
    return story.save();
};

// http://localhost:5000/api/v1/stories/theme-rooms
export const fetchStoriesByThemeRooms = async (): Promise<{ stories: IStory[] }[]> => {
    const themeRooms = await ThemeRoom.find({}, '_id').lean();

    const storiesByThemeRooms = await Promise.all(themeRooms.map(async (themeRoom) => {
        const stories = await Story.find({ themeRoomId: themeRoom._id }).lean();
        return {
            themeRoomId: themeRoom._id,
            stories: stories
        };
    }));

    return storiesByThemeRooms;
}

// http://localhost:5000/api/v1/stories/theme-rooms/{themeRoomId}
export const fetchStoriesByThemeRoomId = async (themeRoomId: string): Promise<IStory[]> => {
    const objectId = new mongoose.Types.ObjectId(themeRoomId);
    const stories = await Story.find({ themeRoomId: objectId }).populate('authorId', 'name');
    return stories;
}

// http://localhost:5000/api/v1/stories/{storyId}
export const deleteSingleStory = async (storyId: string): Promise<void> => {
    const objectId = new mongoose.Types.ObjectId(storyId);

    const story = await Story.findById(objectId);

    if (!story) {
        throw new Error("Story not found");
    }

    if(story.next && story.next.length > 0){
        throw new Error("Cannot delete linked stories");
    }

    // remove the current story from the next array of previous stories
    if (story.prev && story.prev.length > 0) {
        await Story.updateMany(
            { _id: { $in: story.prev } },
            { $pull: { next: objectId } }
        );
    }

    // Remove this story from the 'prev' array of its next stories
    if (story.next && story.next.length > 0) {
        await Story.updateMany(
            { _id: { $in: story.next } },
            { $pull: { prev: objectId } }
        );
    }

    // Delete the story
    await Story.findByIdAndDelete(objectId);

}

// http://localhost:5000/api/v1/stories/{storyId}
export const editStory = async (storyData: Partial<IStory>, id: mongoose.Types.ObjectId): Promise<void> => {
    const result = await Story.updateOne({ _id: id }, { $set: storyData });
    if (result.matchedCount === 0) {
        throw new Error("Story not found");
    }
    if (result.modifiedCount === 0) {
        console.log("No changes were made to the story");
    }
}

// http://localhost:5000/api/v1/stories/filtered
export const fetchFilteredStories = async(storyIds : mongoose.Types.ObjectId[]) : Promise<IStory[]> => {
    const result = await Story.find({'_id' : {$in: storyIds}})
    return result;
}