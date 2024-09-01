import mongoose from "mongoose";
import config from "./config/config.index";

export const connectDb = async (): Promise<void> => {
  try {
    if (!config.dbURI) {
      throw new Error('Database URI is not defined in the configuration');
    }
    await mongoose.connect(config.dbURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};