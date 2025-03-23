import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/index';
import { connectDB } from '../src/config/db';
import { User } from '../src/models/User';
import { Post } from '../src/models/Post';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });


describe('Test for Post Endpoints', () => {
    let token: string;
    let testPostId: string;

    beforeAll(async () => {
        await connectDB();
        await Post.deleteMany({})
        await User.deleteMany({});
        
        await request(app)
        .post('/api/auth/register')
        .send({
            email: 'testpost@example.com',
            username: 'postUser',
            password: 'PostPass123!',
      });

      const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testpost@example.com',
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
        await mongoose.connection.close();
    });

    test('Should create a post at POST /api/posts', async () => {
        const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'My test post',
          content: 'This is test content for the post.',
        });
  
      expect(response.statusCode).toBe(201);
      expect(response.body.post).toHaveProperty('author');
    });

    test('Should fetch the post by ID at GET /api/posts/:postId', async () => {
      const response = await request(app)
      .get(`/api/posts/${testPostId}`)
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.statusCode).toBe(200);
    });

});