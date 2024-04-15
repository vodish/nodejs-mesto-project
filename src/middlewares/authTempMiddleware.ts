import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { error401 } from '../utils/errors';

const SALT_KEY = process.env.SALT_KEY || '';


function authTempMiddleware(req: Request, res: Response, next: NextFunction) {
  //
  if (!req.cookies.user_token) {
    return next();
  }

  const token = jwt.verify(req.cookies.user_token, SALT_KEY) as { _id: string };

  if (!token._id) {
    throw error401('Необходима авторизация');
  }

  req.user = { _id: token._id };
  next();
}

export default authTempMiddleware;
