import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import { ErrorObject } from '../utils/errors';


type TErrorIncome = ErrorObject & Error.ValidationError;


function errorHandler(err: TErrorIncome, req: Request, res: Response, next: NextFunction) {
  //
  let statusCode = err.statusCode || 500;
  const message = err.message || 'На сервере ошибка 500';

  if (['ValidationError', 'MongoServerError', 'Error'].includes(err.name)) {
    statusCode = 400;
  }


  res.status(statusCode).send({ error: message });

  next();
}

export default errorHandler;
