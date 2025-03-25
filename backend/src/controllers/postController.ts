import { Response } from 'express';
import { IPost, Post } from '../models/Post';
import { IRequest } from '../middleware/authMiddleware';
import { Like } from '../models/Like';
import { Comment, IComment } from '../models/Comment';

export const createPost = async (req: IRequest, res: Response) => {
    try {
        const { title, content } = req.body;
        const user = req.user;
        
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

export const getPosts = async (req: IRequest, res: Response) => {
  try {
    const userId = req.user?.uid;
    const { authorId, postId } = req.query;

    let query = {};

    if (postId) {
      query = { _id: postId };
    } else if (postId) {
      query = { 'author.uid': Number(authorId) };
    }

     const posts = await Post.find(query).sort({ createdAt: -1 });
     
     const enrichedPosts: IPost[] = await Promise.all(
      posts.map(async (post) => {
        const enriched: IPost = {
          id: post._id.toString(),
          title: post.title,
          content: post.content,
          author: {
            uid: post.author?.uid,
            username: post.author?.username,
          },
          likes_count: post.likes_count || 0,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        };

        if (userId) {
          const liked = await Like.exists({
            user: userId,
            targetId: post._id,
            targetType: 'post',
          });
    
          enriched.likedByCurrentUser = !!liked;
        }
        return enriched; 
      })

    );

    if (postId && enrichedPosts.length > 0) {
      return res.status(200).json({ post: enrichedPosts[0] });
    }

    return res.status(200).json({
      message: 'Posts fetched successfully',
      posts: enrichedPosts,
    });


  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPostComments = async (req: IRequest, res: Response) => {
  try {
    //const userId = req.user?.uid;
    const { postId } = req.params;
  
    const post = await Post.findById(postId);
  
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
  
    const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 });

    const enrichedComments: IComment[] = await Promise.all(
      comments.map(async (comment) => {
        const enriched: IComment = {
          id: comment._id.toString(),
          post: post._id.toString(),
          content: comment.content,
          author: {
            uid: comment.author?.uid,
            username: comment.author?.username,
          },
          likes_count: comment.likes_count || 0,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        };

        return enriched;
      })
    );
  
    return res.status(200).json({
      message: 'Comments fetched successfully',
      comments: enrichedComments,
    });
  } catch (error) {
    console.error('Error fetching post comments:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
