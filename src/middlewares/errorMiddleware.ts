import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { Error } from 'mongoose';
import { ErrorObject } from '../utils/errors';

type TErrorIncome = ErrorObject & Error;


function errorHandler(err: TErrorIncome, req: Request, res: Response, next: NextFunction) {
  //
  let statusCode = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR; // 500
  let message = err.message || 'На сервере ошибка';

  if (err.code === 11000) { // дубликат пользователя
    statusCode = constants.HTTP_STATUS_CONFLICT; // 409
    // console.log(err);
  }

  if (err instanceof Error.ValidationError) {
    statusCode = constants.HTTP_STATUS_BAD_REQUEST; // 400
  }
  // console.log(typeof err);

  if (err instanceof Error.CastError) { // ошибка типа данных
    statusCode = constants.HTTP_STATUS_BAD_REQUEST; // 400
    message = err.reason ? err.reason.message : 'HTTP_STATUS_BAD_REQUEST';
  }


  res.status(statusCode).send({ error: message });
  next();
}

export default errorHandler;
