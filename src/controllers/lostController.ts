import { Request, Response } from 'express';
import { error404 } from '../utils/errors';


function lostController(req: Request, res: Response) {
  throw error404('Страница не найдена...');
}

export default lostController;
