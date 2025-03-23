import { Response, Request } from 'express';
import { Post } from '../models/Post';
import { IRequest } from '../middleware/authMiddleware';

export const createPost = async (req: IRequest, res: Response) => {
    try {
        const { title, content } = req.body;
        const user = req.user;
        console.log(user.username, user.uid);
        
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
          }
    
        const post = await Post.create({
            title,
            content,
            author: {
                uid: user.uid,
                username: user.username,
            },
        });
    
        return res.status(201).json({
            message: 'Post created',
            post,
        });
    
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }    
};

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts,
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};