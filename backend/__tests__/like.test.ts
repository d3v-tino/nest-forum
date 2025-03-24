import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/index';
import { connectDB } from '../src/config/db';
import { User } from '../src/models/User';
import { Post } from '../src/models/Post';
import { describe, expect, test, beforeAll, afterAll, jest } from '@jest/globals';
import dotenv from 'dotenv';
import { Like } from '../src/models/Like';

dotenv.config({ path: '.env.test' });

describe('Test for liking content', () => {
    let token: string;
    let testPostId: string;
    let uid: string;

    beforeAll(async () => {
        await connectDB();
        await Post.deleteMany({});
        await User.deleteMany({});
        await Like.deleteMany({});

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
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Post.deleteMany({});
        await Like.deleteMany({});
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
        const post = await Post.findById(testPostId);
    
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
        const post = await Post.findById(testPostId);
    
      expect(response.statusCode).toBe(200);
      expect(response.body.liked).toBe(false);
      expect(response.body.likes_count).toBe(0);
    });
});