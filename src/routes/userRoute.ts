import express from 'express';
import multer from 'multer';
import {
  userAll,
  userAvatarUpdate,
  userById,
  userCreate,
  userUpdate,
} from '../controllers/userController';

//
// марштуры пользаков
// прием данных как FormData
const userRouter = express.Router();
const formdata = multer();

//
//
// получить всех
// получить указанного по ид
userRouter.get('/', userAll);
userRouter.get('/:userId', userById);
//
//
// создать
userRouter.post('/', formdata.none(), express.json(), userCreate);
// userRouter.post('/', express.json(), userCreate);
//
//
// обновить
// обновить аватарку
userRouter.patch('/me', express.json(), userUpdate);
userRouter.patch('/me/avatar', express.json(), userAvatarUpdate);
//
//
//
export default userRouter;
