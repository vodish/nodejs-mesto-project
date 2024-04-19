import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { Error } from 'mongoose';
import { ErrorObject } from '../utils/errors';

type TErrorIncome = ErrorObject & Error;


function errorMiddleware(err: TErrorIncome, req: Request, res: Response, next: NextFunction) {
  //
  let statusCode = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR; // 500
  /*
    Даниил, я не понимаю что вы имеете ввиду?
    У меня всегда сюда попадает ошибка с сообщением.
    Ссобщение генерирует монгус или я сам.
    В любом случае текст ошибки всегда будет.
    Прошу показать кодом, для примера, если не сложно, как нужно сделать для вас?
  */
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
    message = err.reason ? err.reason.message : 'Формат данных не соответствует ожидаемому'; // такая формулировака норм?
  }


  res.status(statusCode).send({ error: message });
  next();
}

export default errorMiddleware;
