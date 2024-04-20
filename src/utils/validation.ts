import { celebrate, Joi } from 'celebrate';

// -- разные примеры
// email:      Joi.string().required().email(),
// password:   Joi.string().required().min(8),
// name:       Joi.string().required().min(2).max(30),
// age:        Joi.number().integer().required().min(18),
// about:      Joi.string().min(2).max(30),


export const validSignup = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
  }),
});

export const validSignin = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
  }),
});


export const validUsersId = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
  }),
});

export const validUsersMe = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
  }),
});

export const validUsersMeAvatar = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
  }),
});


// проверки карточек

export const validCardsInsert = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
  }),
});

export const validCardsId = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
  }),
});
