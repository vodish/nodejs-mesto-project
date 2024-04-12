import { Request, Response, NextFunction } from 'express';

//

function authTempMiddleware(req: Request, res: Response, next: NextFunction) {
  //
  req.user = {
    _id: '6616877a1a8eb02610edcb16',
  };

  next();
}

export default authTempMiddleware;
