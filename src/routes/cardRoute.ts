import express from 'express';
import {
  сardsAll,
  сardInsert,
  сardDelete,
  сardLike,
  сardDislike,
} from '../controllers/cardController';
import {
  vcDel,
  vcDisl,
  vcIns,
  vcLike,
} from '../middlewares/validationMiddleware';



// марштуры карточек
const cardRouter = express.Router();

cardRouter.get('/', сardsAll); // получить все карточки
cardRouter.post('/', vcIns, сardInsert); // добавить карточку
cardRouter.delete('/:cardId', vcDel, сardDelete); // удалить карточку
cardRouter.put('/:cardId/likes', vcLike, сardLike); // лайк для карточки
cardRouter.delete('/:cardId/likes', vcDisl, сardDislike); // дизлайк для карточки

export default cardRouter;
