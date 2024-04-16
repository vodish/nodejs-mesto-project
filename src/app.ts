import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
// import multer from 'multer';
import userRouter from './routes/userRoute';
import errorMiddleware from './middlewares/errorMiddleware';
import authTempMiddleware from './middlewares/authTempMiddleware';
import cardRouter from './routes/cardRoute';
import { userCreate, userLogin } from './controllers/userController';
import { requestLogger, errorLogger } from './middlewares/loggerMiddleware';
import { error404 } from './utils/errors';



// переменные окружения
const {
  MONGOO_CONNECT,
  SERVER_PORT = 3000,
} = process.env;


if (!MONGOO_CONNECT) {
  throw new Error('Переменная окружения не найдена: /.env/MONGOO_CONNECT');
}



// подключение к бд
mongoose.set('strictQuery', false);
mongoose.connect(MONGOO_CONNECT);



// сервер
const server = express();

// предварительные обработчики
server.use(requestLogger);
server.use(cookieParser());
server.use(express.json());
// server.use(express.urlencoded())
// server.use(multer().none()); // const formdata = multer();
server.use(authTempMiddleware); // авторизация


// маршруты
server.post('/signin', userLogin); // вход пользователя
server.post('/signup', userCreate); // регистрация пользователя
server.use('/users', userRouter);
server.use('/cards', cardRouter);



// обработчик ошибок
server.use(() => { throw error404('Страница не найдена...'); });
server.use(errorLogger);
server.use(errorMiddleware);

// запуск
server.listen(+SERVER_PORT);

console.log(`Сервер запущен http://localhost:${SERVER_PORT}`);
