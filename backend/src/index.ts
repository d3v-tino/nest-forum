import express, { Router } from "express";
import config from "./config/config";
import { connectDB } from "./config/db";
import cors from "cors";
import authRouter from "./routes/authRoute";

const PORT = config.PORT || 5000;
export const app = express();
const apiRouter = Router();

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

// Endpoints
apiRouter.use("/auth", authRouter);

if (config.NODE_ENV !== "test") {
    try {
        connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT} in ${config.NODE_ENV} mode`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to database:", error);
        process.exit(1);
    }
};
