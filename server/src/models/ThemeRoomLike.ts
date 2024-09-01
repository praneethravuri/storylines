import mongoose, { Document, Schema } from 'mongoose';

export interface IThemeRoomLike extends Document {
    userId: mongoose.Types.ObjectId;
    themeRoomId: mongoose.Types.ObjectId;
}

const ThemeRoomLikeSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    themeRoomId: { type: mongoose.Types.ObjectId, ref: 'ThemeRoom', required: true },
  },
  { timestamps: true }
);

// Ensure a user can only like a theme room once
ThemeRoomLikeSchema.index({ userId: 1, themeRoomId: 1 }, { unique: true });

const ThemeRoomLike = mongoose.model<IThemeRoomLike>('ThemeRoomLike', ThemeRoomLikeSchema);

export default ThemeRoomLike;
