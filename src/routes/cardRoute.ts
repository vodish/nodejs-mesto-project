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
//
// марштуры карточек

const cardRouter = express.Router();
const formdata = multer();

//
//
//

cardRouter.get('/', userAll);
cardRouter.get('/:userId', userById);

//
//
// создать

cardRouter.post('/', formdata.none(), express.json(), userCreate);

//
// обновить
// обновить аватарку

cardRouter.patch('/me', express.json(), userUpdate);
cardRouter.patch('/me/avatar', express.json(), userAvatarUpdate);

//
//
//

export default cardRouter;
