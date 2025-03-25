import { NextFunction, Router } from 'express';
import { Request, Response } from 'express';
import { body } from 'express-validator';
import { authenticate, IRequest } from '../middleware/authMiddleware';
import { createComment } from '../controllers/commentController';

const commentRouter = Router();

commentRouter.post('/',
        (req: Request, res: Response, next: NextFunction) => {authenticate(req as IRequest, res, next);},
        [
            body('content').notEmpty().withMessage('Content is required'),
        ],
        (req: Request, res: Response) => {createComment(req as IRequest, res);}
);

export default commentRouter;