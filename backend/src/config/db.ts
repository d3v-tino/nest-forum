import mongoose from "mongoose";
import config from "./config";

const MONGO_URI = config.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}

export const connectDB = async () => {
    try {
        const db = await mongoose.connect(MONGO_URI, {
        });
        console.log(`✅ MongoDB connected: ${db.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1); 
    }
}