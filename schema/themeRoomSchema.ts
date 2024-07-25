import mongoose, { Schema, Document, Model } from 'mongoose';

// document details

// 1. ObjectId: unique id of the theme room (type: ObjectId, required: true)
// 2. name: name of the theme room (type: string, required: true)
// 3. description: description about the theme room (type: string, required: true)
// 4. createdAt & updatedAt (type: ISO date, required: true)
// 5. tags: tags to search for theme room and describe the content in the theme room (type: string[], required: true)


export interface IThemeRoom extends Document {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}

const ThemeRoomSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
    tags: [{ type: String, required: true }]
}, {
    timestamps: true
});

let ThemeRoom: Model<IThemeRoom>;

try {
    ThemeRoom = mongoose.model<IThemeRoom>('ThemeRoom');
} catch {
    ThemeRoom = mongoose.model<IThemeRoom>('ThemeRoom', ThemeRoomSchema);
}

export default ThemeRoom;