import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
import CardModel from '../models/cardModel';
import { error400, error404 } from '../utils/errors';

//

export function сardsAll(req: Request, res: Response, next: NextFunction) {
  CardModel
    .find()
    .then((cards) => res.send(cards))
    .catch(next);
}

//

export function сardInsert(req: Request, res: Response, next: NextFunction) {
  const { name, link } = req.body;
  const owner = req.user._id;

  CardModel
    .create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw error400('Не получилось создать карточку');
      }

      res.send(card);
    })
    .catch(next);
}

//

export function сardDelete(req: Request, res: Response, next: NextFunction) {
  //
  CardModel
    .findByIdAndRemove(req.params.cardId)
    .then((data) => {
      if (!data) {
        throw error404('Не нейдена карточка');
      }
      res.send({ operation: 'Карточка удалена' });
    })
    .catch(next);
}

//

export function сardLike(req: Request, res: Response, next: NextFunction) {
  //
  CardModel
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw error404('Не найдена карточка');
      }

      if (card.likes.includes(req.user._id as ObjectId)) {
        throw error404('Карточка уже лайкнута');
      }
    })
    .catch(next);

  //
  // likes: { $nin: [req.user._id] }
  CardModel
    .findOneAndUpdate(
      {
        _id: req.params.cardId,
      },
      { $push: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      const card1 = JSON.parse(JSON.stringify(card));
      res.send({ ...card1, likes_cnt: card1.likes.length });
    })
    .catch(next);
}

//

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
