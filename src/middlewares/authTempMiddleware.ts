import { Request, Response, NextFunction } from 'express';

//

export type RequestIncome = Request & { user: { _id: string } }

//

function authTempMiddleware(req: Request, res: Response, next: NextFunction) {
  //@ts-ignore
  req.user = {
    _id: '6616877a1a8eb02610edcb16'
  };

  next();
}

export default authTempMiddleware;
