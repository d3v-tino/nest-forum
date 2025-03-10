import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, 
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  password_hash: { type: String, required: true },
  avatar_url: { type: String, required: false },
}, { timestamps: true });

UserSchema.pre("save", async function (next){
  if (!this.isModified("password_hash")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
  next();
});

export const User = mongoose.model("User", UserSchema);
