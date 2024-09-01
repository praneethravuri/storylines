import mongoose, { Document, Schema } from 'mongoose';

export interface IReaction extends Document {
    userId: mongoose.Types.ObjectId;
    storyId: mongoose.Types.ObjectId;
    reactionType: 'like' | 'dislike';
}

const StoryReactionSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    storyId: { type: mongoose.Types.ObjectId, ref: 'Story', required: true },
    reactionType: { type: String, enum: ['like', 'dislike'], required: true },
  },
  { timestamps: true }
);

// Ensure a user can only react once per story
StoryReactionSchema.index({ userId: 1, storyId: 1 }, { unique: true });

const Reaction = mongoose.model<IReaction>('Reaction', StoryReactionSchema);

export default Reaction;
