import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    userId: mongoose.Types.ObjectId;
    storyId: mongoose.Types.ObjectId;
    content: string;
}

const CommentSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    storyId: { type: mongoose.Types.ObjectId, ref: 'Story', required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
