import express from 'express';

import {
  userAll,
  userAvatarUpdate,
  userById,
  userCreate,
  userUpdate,
} from '../controllers/userController';

//
// маршруты пользователя

const userRouter = express.Router();

userRouter.get('/', userAll); // получить всех пользователей
userRouter.get('/:userId', userById); // получить указанного по ид
userRouter.post('/', userCreate); // создать пользователя
userRouter.patch('/me', userUpdate); // обновить пользователя
userRouter.patch('/me/avatar', userAvatarUpdate); // обновить аватарку пользователя

export default userRouter;
