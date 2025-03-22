import { NextFunction, Router } from 'express';
import { body } from 'express-validator';
import { Request, Response } from 'express';
import { authenticate, IRequest } from '../middleware/authMiddleware';
import { createPost } from '../controllers/postController';

const postRouter = Router();

postRouter.post('/', 
    (req: Request, res: Response, next: NextFunction) => {authenticate(req as IRequest, res, next);},
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('content').notEmpty().withMessage('Content is required'),
    ],
    (req: Request, res: Response) => {createPost(req as IRequest, res);}
);

export default postRouter;