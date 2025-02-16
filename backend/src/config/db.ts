import config from "./config";
import mongoose from "mongoose";
import { User } from "../models/User";

export const connectDB = async () => {
    try {
        void mongoose.connect(config.MONGO_URI as string);
    console.log("MongoDB Connected");

    const existingUser = await User.findOne({ username: "tino" });
    if (!existingUser) {
        await User.create({
            username: "Tino"
        });
        console.log("Mock user added");
    }
    } catch (error) {
        console.error("Error connecting to database", error);
    }
}