import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { error401 } from '../utils/errors';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-key';


function authTempMiddleware(req: Request, res: Response, next: NextFunction) {
  let token;

  // проверка токена, если он есть
  if (req.cookies.user_token) {
    token = jwt.verify(req.cookies.user_token, JWT_SECRET) as { _id: string };

    if (token._id) {
      req.user = { _id: token._id };
    }
  }

  // пропустить все страницы кроме регистрации и авторизации
  if (req.url.startsWith('/sign')) {
    return next();
  }

  // ошибка если битый токен
  if (!token) {
    throw error401('Необходима авторизация');
  }

  return next();
}

export default authTempMiddleware;
