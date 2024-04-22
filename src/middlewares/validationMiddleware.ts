import { celebrate, Joi } from 'celebrate';

/*
Айсалкын,
> Валидатор uri для валидации ссылок в joi, к сожалению, пропускает
> некорректные значения, в частности http//:test
проверил я селебрейт, не пускает он такие ссылки как вы указываете,
возможно в селебрейте были изменения...

но для формальности я добавил к обработчику .uri() дополнительную
проверку через регулярное выражение, в данном случае не вижу
большого смысла упарываться в регулярки, поскольку пакет validate
в схеме монгуса тоже проверяет значение на url
validator: (v: string) => isURL(v),

моя регулярка проверяет чтобы имя домена обязательно содержало точку
*/

const reUrl = /\/\/[a-z][a-z0-9]+\.[a-z0-9]+/i;


// валидация пользователя

export const vuUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.string().required().uri().regex(reUrl),
  }),
});


export const vuIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});



// авторизованный пользователь

export const vuById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
});


export const vuUpd = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});


export const vuUpdAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri().regex(reUrl),
  }),
});



// валидация параметров карточки

export const vcIns = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().uri().regex(reUrl),
  }),
});


export const vcDel = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
});


export const vcLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
});


export const vcDisl = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
});
