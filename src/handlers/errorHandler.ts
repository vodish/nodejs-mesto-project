import { Request, Response } from 'express';
import { ErrorObject } from '../utils/errorObjects';

//
//
//
export default function errorHandler(err: ErrorObject, req: Request, res: Response) {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    error: statusCode !== 500 ? message : `На сервере ошибка ${statusCode}`,
  });
}
