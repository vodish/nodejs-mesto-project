import { Request, Response, NextFunction } from 'express';
import CardModel from '../models/cardModel'
import { error400 } from '../utils/errors';

export function сardsAll(req: Request, res: Response, next: NextFunction) {
  CardModel
    .find()
    .then((cards) => res.send(cards))
    .catch(next);
}

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

export function сardDelete(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'сardDelete' });
}

export function сardLike(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'сardLike' });
}

export function сardDislike(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'сardDislike' });
}
