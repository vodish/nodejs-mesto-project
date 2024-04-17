import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { error401, error404 } from '../utils/errors';


const SALT_KEY = process.env.SALT_KEY || '';


// создать пользователя
export async function userCreate(req: Request, res: Response, next: NextFunction) {
  const dataUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  };

  bcrypt.hash(dataUser.password, 10)
    .then((hash) => User.create({ ...dataUser, password: hash }))
    .then((user) => res.status(constants.HTTP_STATUS_CREATED).send(user))
    .catch(next);
}



// login пользователя
export function userLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  let tokenObject: { _id: string };

  User
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

      const token = jwt.sign(tokenObject, SALT_KEY, { expiresIn: '7d' });

      res.cookie('user_token', token, { httpOnly: true });
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



// получить авторизованного пользователя
export function userMe(req: Request, res: Response, next: NextFunction) {
  //
  User
    .findById(req.user._id)
    .orFail(error404('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
}


// получить пользователя по id
export function userById(req: Request, res: Response, next: NextFunction) {
  //
  User
    .findById(req.params.userId)
    .orFail(error404('Пользователь не найден.'))
    .then((user) => res.send(user))
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
