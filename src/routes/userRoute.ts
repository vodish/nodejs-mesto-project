import { Router } from 'express';
import {
  userAll,
  userAvatarUpdate,
  userById,
  userCreate,
  userUpdate,
} from '../controllers/userController';

//
//
// марштуры пользаков
const userRouter = Router();
//
//
// получить всех
// получить указанного по ид
userRouter.get('/', userAll);
userRouter.get('/:userId', userById);
//
//
// создать
userRouter.post('/', userCreate);
//
//
// обновить
// обновить аватарку
userRouter.patch('/me', userUpdate);
userRouter.patch('/me/avatar', userAvatarUpdate);
//
//
//
export default userRouter;
