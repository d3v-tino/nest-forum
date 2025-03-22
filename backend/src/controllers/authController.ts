import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { User } from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({ error: "Email already in use" });
        }

        const user = await User.create({
            username: username,
            email: email,
            password_hash: password
        });

        console.log("User registered");
        return res.status(201).json({
            message: "User registered",
            user: {
                id: user.uid,
                email: user.email,
                username: user.username,
            }
        });
        
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}