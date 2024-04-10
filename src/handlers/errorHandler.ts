import { Request, Response, NextFunction } from 'express';

type ErrorObject = Error & {
  statusCode?: number,
};

export function errorHandler(err: ErrorObject, req: Request, res: Response, next: NextFunction) {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    error: statusCode !== 500 ? message : 'На сервере беда...'
  });
}