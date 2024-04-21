import { Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export const vuUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.string().required().uri(),
  }),
})


export const vuIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
})


export function vuMe(req: Request, res: Response, next: NextFunction) {

  next();
}

export function vuById(req: Request, res: Response, next: NextFunction) {

  next();
}

export function vuUpd(req: Request, res: Response, next: NextFunction) {

  next();
}

export function vuUpdAvatar(req: Request, res: Response, next: NextFunction) {

  next();
}

export function vcIns(req: Request, res: Response, next: NextFunction) {

  next();
}

export function vcDel(req: Request, res: Response, next: NextFunction) {

  next();
}

export function vcLike(req: Request, res: Response, next: NextFunction) {

  next();
}

export function vcDisl(req: Request, res: Response, next: NextFunction) {

  next();
}
