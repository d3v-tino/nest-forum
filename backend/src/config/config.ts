import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

const config =  {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
}

export default config;