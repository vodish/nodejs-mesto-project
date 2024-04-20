import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { Error } from 'mongoose';
import { ErrorObject } from '../utils/errors';

export type TErrorIncome = ErrorObject & Error;
const E500 = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
// const E400 = constants.HTTP_STATUS_BAD_REQUEST;
// const E409 = constants.HTTP_STATUS_CONFLICT;


function errorMiddleware(err: TErrorIncome, req: Request, res: Response, next: NextFunction) {
  //
  const statusCode = err.statusCode || E500;
  const message = statusCode === E500 ? 'На сервере произошла ошибка' : err.message;

  // if (err.code === 11000) { // дубликат пользователя
  //   statusCode = E409;
  // }
  // else if (err instanceof Error.ValidationError) { // ошибка валидации схемы монгуса
  //   statusCode = E400;
  // }
  // else if (err instanceof Error.CastError) { // ошибка типа данных
  //   statusCode = E400;
  //   message = err.reason ? err.reason.message : 'Формат данных не соответствует ожидаемому';
  // }

  res.status(statusCode).send({ error: message });
  next();
}

export default errorMiddleware;
