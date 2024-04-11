import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel';
import { error400, error404 } from '../utils/errors';
import { RequestIncome } from 'middlewares/authTempMiddleware';

//
//
// получить всех пользователей

export function userAll(req: Request, res: Response, next: NextFunction) {
  //
  User.find({})
    .then(userAll => res.send(userAll))
    .catch(next);
}

//
//
// получить пользователя по id

export function userById(req: Request, res: Response, next: NextFunction) {
  //
  User.findById({ _id: new mongoose.Types.ObjectId(req.params.userId) })
    .then((user) => {
      if (!user) {
        throw error404('Пользователь не найден');
      }

      res.send(user);
    })
    .catch(next);
}

//
//
// создать пользователя

export function userCreate(req: Request, res: Response, next: NextFunction) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        throw error400('Не получилось создать пользователя');
      }

      res.send(user);
    })
    .catch(next);
}

//
//
// обновить пользователя

export function userUpdate(req: Request, res: Response, next: NextFunction) {
  const { name, about } = req.body;

  // @ts-ignore для req.user._id
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(next);
}

//
//
// обновить аватарку пользователя

export function userAvatarUpdate(req: Request, res: Response, next: NextFunction) {
  const { avatar } = req.body;

  // @ts-ignore для req.user._id
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(next);
}
