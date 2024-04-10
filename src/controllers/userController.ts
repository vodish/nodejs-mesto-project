import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';

//
//
//
export function userAll(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'userFindAll' });
}

//
//
export function userById(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'userById', userId: req.params.userId });
}

//
//
//
//
export function userCreate(req: Request, res: Response, next: NextFunction) {
  // const { name, about } = req.body;

  console.log('body', req.body);


  res.send(req.body);

  // User.create({ name, about })
  //   .then((user) => res.send(user))
  //   .catch(next);
}

//
//
//
//
//
export function userUpdate(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'userUpdate' });
}

//
//
export function userAvatarUpdate(req: Request, res: Response, next: NextFunction) {
  res.send({ handle: 'userAvatarUpdate' });
}
