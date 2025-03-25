import { Response } from 'express';
import { Comment } from '../models/Comment';
import { IRequest } from '../middleware/authMiddleware';
import { Post } from '../models/Post';

export const createComment = async (req: IRequest, res: Response) => {
    try {
        const { postId, content } = req.body;
        const user = req.user;

        if (!content) {
            return res.status(400).json({ error: 'Content are required.' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        const comment = await Comment.create({
            post: postId,
            content,
            author: {
                uid: user.uid,
                username: user.username,
            },
        });

        return res.status(201).json({
            message: 'Comment created',
            comment,
        });

    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }  
};
