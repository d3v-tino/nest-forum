import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";

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

export const loginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
          console.log("User not found");
          return res.status(400).json({ error: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
          console.log("Invalid password");
          return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.uid, email: user.email },
            config.JWT_SECRET || "dev_secret",
            { expiresIn: "1h" }
          );
        
          console.log("User logged in");
          return res.status(200).json({
            message: "Login successful",
            token,
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