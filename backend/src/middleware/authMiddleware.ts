import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';

export interface AuthUser {
  uid: number;
  username: string;
}

export interface IRequest extends Request {
    user: AuthUser;
}

export const authenticate = (req: IRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const token = authHeader.split(' ')[1];

      try {
        const decoded = jwt.verify(token, config.JWT_SECRET as string) as AuthUser;
        req.user = decoded;
        console.log(decoded);
        return next();
      } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid token' });
      }

};