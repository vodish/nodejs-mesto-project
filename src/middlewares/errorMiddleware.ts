import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import { ErrorObject } from '../utils/errors';


type TErrorIncome = ErrorObject & Error.ValidationError;


function errorHandler(err: TErrorIncome, req: Request, res: Response, next: NextFunction) {
  //
  let statusCode = err.statusCode || 500;
  const message = err.message || 'На сервере ошибка 500';

  if (err.code === 11000) { // дубликат пользователя
    statusCode = 409;
  }


  res.status(statusCode).send({ error: message });

  next();
}

export default errorHandler;
