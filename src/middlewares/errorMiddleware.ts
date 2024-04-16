import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import { ErrorObject } from '../utils/errors';
import { constants } from 'http2';

type TErrorIncome = ErrorObject & Error.ValidationError;


function errorHandler(err: TErrorIncome, req: Request, res: Response, next: NextFunction) {
  //
  let statusCode = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR; // 500
  const message = err.message || 'На сервере ошибка 500';

  if (err.code === 11000) { // дубликат пользователя
    statusCode = constants.HTTP_STATUS_CONFLICT; // 409
  }


  res.status(statusCode).send({ error: message });
  next();
}

export default errorHandler;
