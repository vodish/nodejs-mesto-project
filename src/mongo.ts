import mongoose from "mongoose";

// переменные окружения
export const {
  MONGOO_CONNECT = 'mongodb://localhost:27017/mestodb',
  SERVER_PORT = 3000,
} = process.env;


mongoose
  .set('strictQuery', false)
  .connect(MONGOO_CONNECT)
  .then(() => {
    console.log('Connection estabislished with MongoDB');
  })
  .catch(error => {
    console.error(MONGOO_CONNECT);
    console.error(error.message);
  });

