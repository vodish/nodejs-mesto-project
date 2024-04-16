import express from 'express';
import {
  userAll,
  userAvatarUpdate,
  userById,
  userMe,
  userUpdate,
} from '../controllers/userController';


// маршруты пользователя
const userRouter = express.Router();


userRouter.get('/', userAll); // получить всех пользователей
userRouter.get('/me', userMe); // получить авторизованного пользователя
userRouter.get('/:userId', userById); // получить указанного по ид
userRouter.patch('/me', userUpdate); // обновить пользователя
userRouter.patch('/me/avatar', userAvatarUpdate); // обновить аватарку пользователя


export default userRouter;
