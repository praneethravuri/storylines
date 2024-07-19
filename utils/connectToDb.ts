import mongoose, { Connection } from 'mongoose';

let cachedConnection: Connection | null = null;

export async function connectToDB() {
    if (cachedConnection) {
        console.log("Using cached connection");
        return cachedConnection;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        cachedConnection = conn.connection;
        console.log("New MongoDB connection");
        return cachedConnection;
    } catch (error) {
        console.log(error);
        throw error;
    }
}