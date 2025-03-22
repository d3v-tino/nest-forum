import { Router } from "express";
import { registerUser } from "../controllers/authController";
import { body } from "express-validator";
import { Request, Response } from "express";

const authRouter = Router();


authRouter.post("/register",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    async (req: Request, res: Response) => { await registerUser(req, res); });

export default authRouter;