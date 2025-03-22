import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { app } from "../src/index";
import request from "supertest";
import { User } from "../src/models/User";
import mongoose from "mongoose";
import { connectDB } from "../src/config/db";

describe("Test for Auth Endpoints", () => {

    beforeAll(async () => {
        await connectDB();
        await User.deleteMany({}); 
    });
    
    afterAll(async () => {
        await User.deleteMany({}); 
        await mongoose.connection.close();
    });
    

    test("Test user registration at /register", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                email: "testuser12@example.com",
                username: "testuser21",
                password: "TestPassword123!",
            });
    
        expect(response.statusCode).toBe(201);
    }, 5000);
});