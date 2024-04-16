import winston from 'winston';
import expressWinston from 'express-winston';


// логер запросов
export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'log.request.log' }),
  ],
  format: winston.format.simple(),
});


// логер ошибок
export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'log.error.log' }),
  ],
  format: winston.format.json(),
});
