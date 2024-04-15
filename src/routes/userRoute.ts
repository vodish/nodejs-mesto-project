import express from 'express';
import {
  userAll,
  userAvatarUpdate,
  userById,
  userCreate,
  userMe,
  userUpdate,
} from '../controllers/userController';


// маршруты пользователя
const userRouter = express.Router();


// userRouter.post('/', userCreate); // создать пользователя
userRouter.get('/', userAll); // получить всех пользователей
userRouter.get('/me', userMe); // получить авторизованного пользователя
userRouter.get('/:userId', userById); // получить указанного по ид
userRouter.patch('/me', userUpdate); // обновить пользователя
userRouter.patch('/me/avatar', userAvatarUpdate); // обновить аватарку пользователя


export default userRouter;
