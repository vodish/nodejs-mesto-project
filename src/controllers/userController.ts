import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { Error400 } from '../utils/errorObjects';

//
//
//
export function userAll(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'userFindAll' });
}

//
//
export function userById(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'userById', userId: req.params.userId });
}

//
//
//
//
export function userCreate(req: Request, res: Response, next: NextFunction) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      throw new Error400('Переданы некорректные данные для создания пользователя');

      res.send(user);
    })
    .catch(next);
}

//
//
//
//
//
export function userUpdate(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'userUpdate' });
}

//
//
export function userAvatarUpdate(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'userAvatarUpdate' });
}
