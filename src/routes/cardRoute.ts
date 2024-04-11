import express from 'express';
import {
  сardDelete,
  сardDislike,
  сardInsert,
  сardLike,
  сardsAll,
} from '../controllers/cardController';

//
//
// марштуры карточек

const cardRouter = express.Router();

cardRouter.get('/', сardsAll);
cardRouter.post('/', сardInsert);
cardRouter.delete('/:cardId', сardDelete);
cardRouter.put('/:cardId/likes', сardLike);
cardRouter.delete('/:cardId/likes', сardDislike);


export default cardRouter;
