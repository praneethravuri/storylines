import mongoose, { Document, Schema } from 'mongoose';

export interface IBookmarkStory extends Document {
    userId: mongoose.Types.ObjectId;
    storyId: mongoose.Types.ObjectId;
}

const BookmarkStorySchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    storyId: { type: mongoose.Types.ObjectId, ref: 'Story', required: true },
  },
  { timestamps: true }
);

// Ensure a user can only save a story once
BookmarkStorySchema.index({ userId: 1, storyId: 1 }, { unique: true });

const BookmarkStory = mongoose.model<IBookmarkStory>('BookmarkStory', BookmarkStorySchema);

export default BookmarkStory;
