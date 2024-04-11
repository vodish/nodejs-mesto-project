import express from 'express';
// import multer from 'multer';
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
// const formdata = multer();
// userRouter.post('/', formdata.none(), userCreate); // создать пользователя

userRouter.get('/', userAll); // получить всех пользователей
userRouter.get('/:userId', userById); // получить указанного по ид
userRouter.post('/', userCreate); // создать пользователя
userRouter.patch('/me', userUpdate); // обновить пользователя
userRouter.patch('/me/avatar', userAvatarUpdate); // обновить аватарку пользователя

export default userRouter;
