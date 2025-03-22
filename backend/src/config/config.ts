import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
  }

const config =  {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    API_BASE_URL: process.env.API_BASE_URL
}

export default config;