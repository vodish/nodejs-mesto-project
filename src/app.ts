import 'dotenv/config';
import express from 'express';
import { errors as errorCelebrate } from 'celebrate';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute';
import errorMiddleware from './middlewares/errorMiddleware';
import authTempMiddleware from './middlewares/authTempMiddleware';
import cardRouter from './routes/cardRoute';
import { userCreate, userLogin } from './controllers/userController';
import { requestLogger, errorLogger } from './middlewares/loggerMiddleware';
import { error404 } from './utils/errors';
import { vuIn, vuUp } from './middlewares/validationMiddleware';
import { crashTest, testTest, mongoTest } from './controllers/testController';
const cors = require('cors')

// подключение к бд
import { SERVER_PORT } from './mongo'



// сервер
const app = express();
app.use(cors());
app.get('/test', testTest); // тест, сервер просто доступен
app.get('/mongo-test', mongoTest); // тест, подключения к mongodb
app.get('/crash-test', crashTest); // тест, краш тест по заданию

// обработчики мидлвары
app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());
app.use(authTempMiddleware); // авторизация


// маршруты
app.post('/signup', vuUp, userCreate); // регистрация пользователя
app.post('/signin', vuIn, userLogin); // вход пользователя
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(() => { throw error404('Страница не найдена...'); });


// обработчик ошибок
app.use(errorLogger);
app.use(errorCelebrate(), errorMiddleware);

// запуск
app.listen(+SERVER_PORT, () => {
  // if (err) console.log(err);
  console.log(`Сервер запущен http://localhost:${SERVER_PORT}`);
});

