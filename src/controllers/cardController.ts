import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { Error } from 'mongoose';
import CardModel from '../models/cardModel';
import { error400, error403, error404 } from '../utils/errors';
import { less } from '../utils/tools';


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
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return next(error400(err.message));
      }
      return next(err);
    });
}


// удалить карточку
export async function сardDelete(req: Request, res: Response, next: NextFunction) {
  //
  const card = await CardModel
    .findById(req.params.cardId)
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(error400(err.message));
      }
      return next(err);
    });

  if (!card) {
    return next(error404('Карточка не нейдена'));
  }

  if (String(card.owner) !== req.user._id) {
    return next(error403('Чужая карточка недоступна к удалению'));
  }

  return CardModel
    .findByIdAndDelete(req.params.cardId)
    .then(() => res.send({ done: 'Карточка удалена' }))
    .catch(next);
}


// лайк
export function сardLike(req: Request, res: Response, next: NextFunction) {
  //
  CardModel
    .findOneAndUpdate(
      {
        _id: req.params.cardId,
        likes: { $nin: [req.user._id] },
      },
      { $push: { likes: req.user._id } },
      { new: true },
    )
    .orFail(error404('Карточка не найдена или уже лайкнута'))
    .then((card) => {
      const card1 = less(card);
      res.send({ ...card1, likes_cnt: card1.likes.length });
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(error400(err.message));
      }
      return next(err);
    });
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

      const card1 = less(card);
      res.send({ ...card1, likes_cnt: card1.likes.length });
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(error400(err.message));
      }
      return next(err);
    });
}
