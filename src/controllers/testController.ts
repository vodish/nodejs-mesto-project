import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/userModel';

export function testTest(req: Request, res: Response) {
  res.json({ data: 'сервер работает!' });
}

export function mongoTest(req: Request, res: Response, next: NextFunction) {
  UserModel
    .find()
    .then((list) => res.send(list))
    .catch(next);
}

export function crashTest() {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}
