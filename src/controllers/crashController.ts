import { Request, Response } from 'express';

export function checkTest(req: Request, res: Response) {
  res.json({ data: 'сервер работает!' });
}

export function crashTest() {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}
