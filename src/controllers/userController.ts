import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { error400, error401, error404 } from '../utils/errors';

const SALT_KEY = process.env.SALT_KEY || '';


// создать пользователя
export async function userCreate(req: Request, res: Response, next: NextFunction) {
  //
  const dataUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar
  };

  bcrypt.hash(dataUser.password, 10)
    .then((hash) => User.create({ ...dataUser, password: hash }))
    .then((user) => {
      if (!user) {
        throw error400('Не получилось создать пользователя');
      }
      res.send(user);
    })
    .catch(next);
}



// login пользователя
export function userLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  let tokenObject: { _id: string };

  User
    .findOne({ email })
    .then((user) => {
      if (!user) {
        throw error404(`Пользователь c емейлом '${email}' не найден`);
      }

      tokenObject = { _id: user._id.toString() };

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw error401('Пароль плохой');
      }

      const token = jwt.sign(tokenObject, SALT_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
}



// получить всех пользователей
export function userAll(req: Request, res: Response, next: NextFunction) {
  //
  User
    .find()
    .then((list) => res.send(list))
    .catch(next);
}



// получить пользователя по id
export function userById(req: Request, res: Response, next: NextFunction) {
  //
  User
    .findById({ _id: new mongoose.Types.ObjectId(req.params.userId) })
    .then((user) => {
      if (!user) {
        throw error404('Пользователь не найден');
      }

      res.send(user);
    })
    .catch(next);
}



// обновить пользователя
export function userUpdate(req: Request, res: Response, next: NextFunction) {
  //
  const { name, about } = req.body;

  User
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => res.send(user))
    .catch(next);
}


// обновить аватарку пользователя
export function userAvatarUpdate(req: Request, res: Response, next: NextFunction) {
  //
  const { avatar } = req.body;

  User
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((user) => res.send(user))
    .catch(next);
}
