import config from "./config";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        void mongoose.connect(config.MONGO_URI as string);
    console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to database", error);
    }
}