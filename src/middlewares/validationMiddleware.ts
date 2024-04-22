import { celebrate, Joi } from 'celebrate';


// валидация пользователя

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



// авторизованный пользователь

const token = {
  cookies: Joi.object().keys({
    user_token: Joi.string().required().min(150),
  }),
};

export const vuMe = celebrate({ ...token });


export const vuById = celebrate({
  ...token,
  params: Joi.object().keys({
    userId: Joi.string().required().min(24),
  }),
});


export const vuUpd = celebrate({
  ...token,
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    about: Joi.string().required().min(2),
  }),
});


export const vuUpdAvatar = celebrate({
  ...token,
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});



// валидация параметров карточки

export const vcIns = celebrate({
  ...token,
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().uri(),
  }),
});


export const vcDel = celebrate({
  ...token,
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24),
  }),
});


export const vcLike = celebrate({
  ...token,
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24),
  }),
});


export const vcDisl = celebrate({
  ...token,
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24),
  }),
});
