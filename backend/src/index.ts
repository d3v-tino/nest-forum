import express from "express";
import config from "./config/config";
import { connectDB } from "./config/db";
import cors from "cors";
import { User } from "./models/User";

const PORT = config.PORT || 5000;
const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    const user = await User.findOne({ username: "Tino" });;
    res.status(200).json({ message: user?.username });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
