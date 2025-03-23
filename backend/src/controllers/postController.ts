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
            message: 'Posts fetched successfully',
            posts,
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPostsByAuthor = async (req: Request, res: Response) => {
    const { authorId } = req.params;
  
    try {
      const posts = await Post.find({ 'author.uid': authorId }).sort({ createdAt: -1 });
  
      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found for this author.' });
      }
  
      return res.status(200).json({
        message: 'Posts fetched successfully',
        posts,
      });
    } catch (error) {
      console.error('Error fetching posts by author:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

export const getPostById = async (req: Request, res: Response) => {
    const { postId } = req.params;
    console.log(postId);
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      return res.status(200).json({
        message: 'Post fetched successfully',
        post,
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };