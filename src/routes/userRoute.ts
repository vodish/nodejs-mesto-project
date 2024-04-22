import express from 'express';
import {
  userAll,
  userAvatarUpdate,
  userById,
  userMe,
  userUpdate,
} from '../controllers/userController';
import {
  vuById,
  vuUpd,
  vuUpdAvatar,
} from '../middlewares/validationMiddleware';


// маршруты пользователя
const userRouter = express.Router();


userRouter.get('/', userAll); // получить всех пользователей
userRouter.get('/me', userMe); // получить авторизованного пользователя
userRouter.get('/:userId', vuById, userById); // получить указанного по ид
userRouter.patch('/me', vuUpd, userUpdate); // обновить пользователя
userRouter.patch('/me/avatar', vuUpdAvatar, userAvatarUpdate); // обновить аватарку пользователя


export default userRouter;
