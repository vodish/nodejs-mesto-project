import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import { ErrorObject } from '../utils/errors';

//
type TErrorIncome = ErrorObject & Error.ValidationError;
//
//
function errorHandler(err: TErrorIncome, req: Request, res: Response, next: NextFunction) {
  //
  let { statusCode = 500, message = 'На сервере ошибка 500' } = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).send({ error: message });

  next();
}

export default errorHandler;
