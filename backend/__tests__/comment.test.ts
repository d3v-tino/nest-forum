import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/index';
import { connectDB } from '../src/config/db';
import { User } from '../src/models/User';
import { Post } from '../src/models/Post';
import { Comment } from '../src/models/Comment';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

describe('Test for Post Endpoints', () => {
    let token: string;
    let testPostId: string;
    let testUserId: number;

    beforeAll(async () => {
        await connectDB();
        await Post.deleteMany({})
        await User.deleteMany({});
        await Comment.deleteMany({});
        
        await request(app)
        .post('/api/auth/register')
        .send({
            email: 'testcomment@example.com',
            username: 'commentUser',
            password: 'CommentPass123!',
      });

      const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testcomment@example.com',
        password: 'CommentPass123!',
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
        await Comment.deleteMany({});
        await mongoose.connection.close();
    });

    test('Should create a comment at POST /api/comments', async () => {
        const response = await request(app)
        .post('/api/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
            'postId': testPostId,
            content: 'Test comment content',
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.comment.post).toBe(testPostId);
    });

    test('Should create a get comments from the post at POST /api/posts/:postId/comments', async () => {
      const response = await request(app)
      .get(`/api/posts/${testPostId}/comments`);

      expect(response.statusCode).toBe(200);
  });
    

});