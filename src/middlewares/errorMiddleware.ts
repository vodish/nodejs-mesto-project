import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { Error } from 'mongoose';
import { ErrorObject } from '../utils/errors';

export type TErrorIncome = ErrorObject & Error;
const E500 = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
// const E400 = constants.HTTP_STATUS_BAD_REQUEST;


function errorMiddleware(err: TErrorIncome, req: Request, res: Response, next: NextFunction) {
  //
  let statusCode = err.statusCode || E500;
  let message = statusCode === E500 ? 'На сервере произошла ошибка' : err.message;

  res.status(statusCode).send({ error: message });
  next();
}

export default errorMiddleware;
