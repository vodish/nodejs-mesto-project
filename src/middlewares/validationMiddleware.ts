import { Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';


// валидация параметров пользователя

export const vuUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.string().required().uri(),
  }),
});


export const vuIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const vuMe = celebrate({
  cookies: Joi.object().keys({
    user_token: Joi.string().required().min(150),
  }),
});


export const vuById = celebrate({
  body: Joi.object().keys({}),
});


export const vuUpd = celebrate({
  body: Joi.object().keys({}),
});


export const vuUpdAvatar = celebrate({
  body: Joi.object().keys({}),
});



// валидация параметров карточки

export const vcIns = celebrate({
  body: Joi.object().keys({}),
});


export const vcDel = celebrate({
  body: Joi.object().keys({}),
});


export const vcLike = celebrate({
  body: Joi.object().keys({}),
});


export const vcDisl = celebrate({
  body: Joi.object().keys({}),
});
