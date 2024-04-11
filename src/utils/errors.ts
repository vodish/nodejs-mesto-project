//

export class ErrorObject extends Error {
  statusCode = 500;

  constructor(message: string) {
    super();
    this.message = message;
  }
}

//

export function error400(message: string) {
  const err = new ErrorObject(message);
  err.statusCode = 400;

  return err;
}

export function error404(message: string) {
  const err = new ErrorObject(message);
  err.statusCode = 404;

  return err;
}
