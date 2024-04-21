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
import { vuIn, vuUp } from './middlewares/validationMiddleware';
import { errors as errorCelebrate } from 'celebrate';


// переменные окружения
const {
  MONGOO_CONNECT = 'mongodb://localhost:27017/mestodb',
  SERVER_PORT = 3000,
} = process.env;



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
server.post('/signup', vuUp, userCreate); // регистрация пользователя
server.post('/signin', vuIn, userLogin); // вход пользователя
server.use('/users', userRouter);
server.use('/cards', cardRouter);
server.use(() => { throw error404('Страница не найдена...'); });


// обработчик ошибок
server.use(errorLogger);
server.use(errorCelebrate(), errorMiddleware);

// запуск
server.listen(+SERVER_PORT);

console.log(`Сервер запущен http://localhost:${SERVER_PORT}`);
