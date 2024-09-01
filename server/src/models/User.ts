import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
    name: string;
    userName: string;
    email: string;
    socialLinks: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
      personalWebsite?: string;
      twitter?: string;
      github?: string;
    };
  }
  
  const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, index: true },
    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      youtube: { type: String },
      personalWebsite: { type: String },
      twitter: { type: String },
      github: { type: String }
    }
  }, {
    timestamps: true
  });

export default mongoose.model<IUser>('User', UserSchema)