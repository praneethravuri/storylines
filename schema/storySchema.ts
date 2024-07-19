import mongoose, { Schema, Document, Model } from 'mongoose';

// if a node's prev is empty and has at least one value in next, then that node is a root node
// if a node's prev and next have at least one value, then that node is a branch node
// if a node's prev is not empty and the next is empty, then that node is a leaf node

export interface IStory extends Document {
    title: string;
    author: string;
    content: string;
    createdAt: Date;
    prev: mongoose.Types.ObjectId[];
    next: mongoose.Types.ObjectId[];
}

const StorySchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    prev: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
    next: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

let Story: Model<IStory>;

try {
    Story = mongoose.model<IStory>('Story');
} catch {
    Story = mongoose.model<IStory>('Story', StorySchema);
}

export default Story;