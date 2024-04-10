import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import userRouter from './routes/userRoute';
import { errorHandler } from './handlers/errorHandler';

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
//
// боди-парсер
// server.use(express.json())
// server.use(express.urlencoded())

//
// маршруты
server.use('/users', userRouter);
// app.use('/cards', userRouter);

//
//
//
server.use('/users', errorHandler);
server.listen(+SERVER_PORT);
console.log(`Server run at http://localhost:${SERVER_PORT}`);
