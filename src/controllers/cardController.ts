import { Request, Response, NextFunction } from 'express';
import CardModel from '../models/cardModel';
import { error400, error404 } from '../utils/errors';
import { constants } from 'http2';


// получить все карточки
export function сardsAll(req: Request, res: Response, next: NextFunction) {
  CardModel
    .find()
    .then((cards) => res.send(cards))
    .catch(next);
}


// добавить карточку
export function сardInsert(req: Request, res: Response, next: NextFunction) {
  const { name, link } = req.body;
  const owner = req.user._id;

  CardModel
    .create({ name, link, owner })
    .then((card) => res.status(constants.HTTP_STATUS_CREATED).send(card))
    .catch(next);
}


// удалить карточку
export function сardDelete(req: Request, res: Response, next: NextFunction) {
  //
  CardModel
    .findOneAndRemove({
      _id: req.params.cardId,
      owner: req.user._id,
    })
    .then((data) => {
      if (!data) {
        throw error404('Карточка не нейдена');
      }
      res.send({ operation: 'Карточка удалена' });
    })
    .catch(next);
}


// лайк
export function сardLike(req: Request, res: Response, next: NextFunction) {
  //
  // CardModel
  //   .findById(req.params.cardId)
  //   .orFail(error404('Не найдена карточка'))
  //   .then((card) => {
  //     if (card.likes.includes(req.user._id as ObjectId)) {
  //       throw error400('Карточка уже лайкнута');
  //     }
  //   })
  //   .catch(next);

  //
  CardModel
    .findOneAndUpdate(
      {
        _id: req.params.cardId,
        likes: { $nin: [req.user._id] }
      },
      { $push: { likes: req.user._id } },
      { new: true },
    )
    .orFail(error400('Карточка не найдена или уже лайкнута'))
    .then((card) => {
      const card1 = JSON.parse(JSON.stringify(card));
      res.send({ ...card1, likes_cnt: card1.likes.length });
    })
    .catch(next);
}


// дизлайк
export function сardDislike(req: Request, res: Response, next: NextFunction) {
  //
  CardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw error404('Не найдена карточка');
      }

      const card1 = JSON.parse(JSON.stringify(card));
      res.send({ ...card1, likes_cnt: card1.likes.length });
    })
    .catch(next);
}
