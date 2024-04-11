import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import userRouter from './routes/userRoute';
import errorMiddleware from './middlewares/errorMiddleware';
import authTempMiddleware from './middlewares/authTempMiddleware';
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

// боди-парсер
// авторизация
server.use(express.json());
// server.use(express.urlencoded())
server.use(authTempMiddleware);
//

// маршруты пользака
// маршруты карточки
server.use('/users', userRouter);
// app.use('/cards', cardRouter);

//

// обработчик ошибок
server.use(errorMiddleware);
//

server.listen(+SERVER_PORT);
console.log(`Сервер запущен http://localhost:${SERVER_PORT}`);
