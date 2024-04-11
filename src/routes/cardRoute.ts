import express from 'express';
import {
  сardsAll,
  сardInsert,
  сardDelete,
  сardLike,
  сardDislike,
} from '../controllers/cardController';

//
// марштуры карточек

const cardRouter = express.Router();

cardRouter.get('/', сardsAll); // получить все карточки
cardRouter.post('/', сardInsert); // добавить карточку
cardRouter.delete('/:cardId', сardDelete); // удалить карточку
cardRouter.put('/:cardId/likes', сardLike); // лайк для карточки
cardRouter.delete('/:cardId/likes', сardDislike); // дизлайк для карточки

export default cardRouter;
