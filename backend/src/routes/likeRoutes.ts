import { Router } from 'express';
import { authenticate, IRequest } from '../middleware/authMiddleware';
import { Request, Response, NextFunction } from 'express';
import { toggleLike } from '../controllers/likeController';

const likeRouter = Router();

likeRouter.post('/:targetId/toggle',
    (req: Request, res: Response, next: NextFunction) => {authenticate(req as IRequest, res, next);},
    (req: Request, res: Response) => {toggleLike(req as IRequest, res);}
);

export default likeRouter;