import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/index';
import { connectDB } from '../src/config/db';
import { User } from '../src/models/User';
import { Post } from '../src/models/Post';
import { describe, expect, test, beforeAll, afterAll, jest } from '@jest/globals';
import dotenv from 'dotenv';
import { Like } from '../src/models/Like';
import { Comment } from '../src/models/Comment';

dotenv.config({ path: '.env.test' });

describe('Test for liking content', () => {
    let token: string;
    let testPostId: string;
    let testCommentId: string;

    beforeAll(async () => {
        await connectDB();
        await Post.deleteMany({});
        await User.deleteMany({});
        await Like.deleteMany({});
        await Comment.deleteMany({});

        await request(app)
        .post('/api/auth/register')
        .send({
            email: 'likeuser@example.com',
            username: 'likeUser',
            password: 'PostPass123!',
        });

      const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'likeuser@example.com',
        password: 'PostPass123!',
      });

      token = loginRes.body.token;

      const createPostRes = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'My test post',
        content: 'Some content here',
      });

      testPostId = createPostRes.body.post.id;

      
      const createCommentRes = await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        postId: testPostId,
        content: 'Some content here',
      });

      testCommentId = createCommentRes.body.comment.id;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Post.deleteMany({});
        await Like.deleteMany({});
        await Comment.deleteMany({});
        await mongoose.connection.close();
    });

    test('Should like a post at POST /api/likes/:postId/toggle', async () => {
      jest.setTimeout(10000);
    
      const response = await request(app)
        .post(`/api/likes/${testPostId}/toggle`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          targetType: 'post',
        });
    
      expect(response.statusCode).toBe(200); 
      expect(response.body.liked).toBe(true);
      expect(response.body.likes_count).toBe(1);
    });
    
    test('Should unlike the post when toggled again at POST /api/likes/:postId/toggle', async () => {
      jest.setTimeout(10000);
    
      const response = await request(app)
        .post(`/api/likes/${testPostId}/toggle`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          targetType: 'post',
        });
    
      expect(response.statusCode).toBe(200);
      expect(response.body.liked).toBe(false);
      expect(response.body.likes_count).toBe(0);
    });

    test('Should like a comment at POST /api/likes/:commentId/toggle', async () => {
      jest.setTimeout(10000);
    
      const response = await request(app)
        .post(`/api/likes/${testCommentId}/toggle`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          targetType: 'comment',
        });
    
      expect(response.statusCode).toBe(200); 
      expect(response.body.liked).toBe(true);
      expect(response.body.likes_count).toBe(1);
    });
});