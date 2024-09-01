import mongoose, { Document, Schema } from 'mongoose';

export interface IStory extends Document {
  title: string;
  content: string;
  authorId: mongoose.Types.ObjectId;
  themeRoomId: mongoose.Types.ObjectId;
  type: 'root' | 'child';
  prev: mongoose.Types.ObjectId[];
  next: mongoose.Types.ObjectId[];
  customId : string
}

const StorySchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, index: true },
  themeRoomId: { type: mongoose.Types.ObjectId, ref: 'ThemeRoom', required: true, index: true },
  type: { type: String, enum: ['root', 'child'], required: true },
  prev: [{ type: mongoose.Types.ObjectId, ref: 'Story' }],
  next: [{ type: mongoose.Types.ObjectId, ref: 'Story' }],
  customId : {type: String, required: true}
}, {
  timestamps: true
});

const Story = mongoose.model<IStory>('Story', StorySchema);

export default Story;