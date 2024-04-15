import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';


export type TUser = {
  email: string,
  password: string,
  name: string,
  about: string,
  avatar: string,
};

const userSchema = new Schema<TUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => isEmail(v),
      message: props => `${props.value} is not a valid`
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    select: false, // не возвращать хеш пароля из базы
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});


const User = model<TUser>('user', userSchema);

export default User;
