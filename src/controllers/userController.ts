import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import { less } from '../utils/tools';
import {
  error400,
  error401,
  error404,
  error409,
} from '../utils/errors';


const JWT_SECRET = process.env.JWT_SECRET || 'dev-key';


// создать пользователя
export async function userCreate(req: Request, res: Response, next: NextFunction) {
  const dataUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  };

  bcrypt
    .hash(dataUser.password, 10)
    .then((hash) => UserModel.create({ ...dataUser, password: hash }))
    .then((user) => {
      res
        .status(constants.HTTP_STATUS_CREATED)
        .send(less(user, 'password'));
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return next(error400(err.message));
      }
      if (err.code === 11000) {
        return next(error409(err.message)); // дубликат пользователя
      }

      return next(err);
    });
}



// login пользователя
export function userLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  let tokenObject: { _id: string };

  UserModel
    .findOne({ email })
    .select('+password')
    .orFail(error404(`Пользователь c емейлом '${email}' не найден`))
    .then((user) => {
      tokenObject = { _id: user._id.toString() };

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw error401('Пароль не подходит');
      }

      const token = jwt.sign(tokenObject, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('user_token', token, { httpOnly: true });
      res.send({ token });
    })
    .catch(next);
}



// получить всех пользователей
export function userAll(req: Request, res: Response, next: NextFunction) {
  //
  UserModel
    .find()
    .then((list) => res.send(list))
    .catch(next);
}



// получить авторизованного пользователя
export function userMe(req: Request, res: Response, next: NextFunction) {
  //
  UserModel
    .findById(req.user._id)
    .orFail(error404('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
}


// получить пользователя по id
export function userById(req: Request, res: Response, next: NextFunction) {
  //
  UserModel
    .findById(req.params.userId)
    .orFail(error404('Пользователь не найден.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(error400(err.message));
      }
      return next(err);
    });
}



// обновить пользователя
export function userUpdate(req: Request, res: Response, next: NextFunction) {
  //
  const { name, about } = req.body;

  UserModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return next(error400(err.message));
      }
      return next(err);
    });
}


// обновить аватарку пользователя
export function userAvatarUpdate(req: Request, res: Response, next: NextFunction) {
  //
  const { avatar } = req.body;

  UserModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return next(error400(err.message));
      }
      return next(err);
    });
}
