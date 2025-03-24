import { Request, Response } from 'express';
import { Like } from '../models/Like';
import { IRequest } from '../middleware/authMiddleware';
import { Post } from '../models/Post';

export const toggleLike = async (req: IRequest, res: Response) => {
    const user = req.user;
    const { targetId } = req.params;
    const { targetType} = req.body;

    try {
        const existingLike = await Like.findOne({ user: user.uid, targetId, targetType });
        if (existingLike) {
            await existingLike.deleteOne();
            if (targetType === 'post') {
              const post = await Post.findByIdAndUpdate(
                targetId,
                { $inc: { likes_count: -1 } },
                { new: true }
              );
              return res.status(200).json({ liked: false, likes_count: post?.likes_count });
            }
          } else {
            await Like.create({ user: user.uid, targetId, targetType });
            if (targetType === 'post') {
              const post = await Post.findByIdAndUpdate(
                targetId,
                { $inc: { likes_count: 1 } },
                { new: true }
              );
              return res.status(200).json({ liked: true, likes_count: post?.likes_count });
            }
          }

    } catch (error) {
        return res.status(500).json({ message: 'Error liking content', error: error });
    }
};