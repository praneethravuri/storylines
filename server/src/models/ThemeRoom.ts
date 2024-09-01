import mongoose, { Schema, Document, Model } from 'mongoose';


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