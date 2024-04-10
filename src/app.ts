import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import userRouter from './routes/userRoute';

//
// переменные окружения
const {
  MONGOO_CONNECT,
  SERVER_PORT = 3000,
} = process.env;

//
//
if (!MONGOO_CONNECT) {
  throw new Error('Переменная окружения не найдена: .env/MONGOO_CONNECT');
}

//
//
// подключение к бд
mongoose.set('strictQuery', false);
mongoose.connect(MONGOO_CONNECT);

//
//
// сервер
const server = express();

server.use('/users', userRouter);
// app.use('/cards', userRouter);

//
//
//
server.listen(+SERVER_PORT);
console.log(`Server run at http://localhost:${SERVER_PORT}`);
