import mongoose, { Document, Schema } from 'mongoose';

export interface IStorybook extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    stories: mongoose.Types.ObjectId[];
}

const StorybookSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    stories: [{ type: mongoose.Types.ObjectId, ref: 'Story' }],
  },
  { timestamps: true }
);

StorybookSchema.index({ userId: 1, name: 1 }, { unique: true });

const Storybook = mongoose.model<IStorybook>('Storybook', StorybookSchema);

export default Storybook;
