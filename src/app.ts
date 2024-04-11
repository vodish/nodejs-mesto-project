import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
// import multer from 'multer';
import userRouter from './routes/userRoute';
import errorMiddleware from './middlewares/errorMiddleware';
import authTempMiddleware from './middlewares/authTempMiddleware';
import cardRouter from './routes/cardRoute';
//

// переменные окружения
const {
  MONGOO_CONNECT,
  SERVER_PORT = 3000,
} = process.env;

//
if (!MONGOO_CONNECT) {
  throw new Error('Переменная окружения не найдена: .env/MONGOO_CONNECT');
}

// подключение к бд
mongoose.set('strictQuery', false);
mongoose.connect(MONGOO_CONNECT);
//

//

// сервер
const server = express();
//

// предварительные обработчики
server.use(express.json());
// server.use(express.urlencoded())
// server.use(multer().none()); // const formdata = multer();
server.use(authTempMiddleware); // авторизация
//
//

server.use('/users', userRouter); // маршруты пользователя
server.use('/cards', cardRouter); // маршруты карточки
//
//

// обработчик ошибок
server.use(errorMiddleware);
//

server.listen(+SERVER_PORT);
console.log(`Сервер запущен http://localhost:${SERVER_PORT}`);
