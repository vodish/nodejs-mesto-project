import { Request, Response, NextFunction } from 'express';

export function сardsAll(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'сardsAll' });
}

export function сardInsert(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'сardInsert' });
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
