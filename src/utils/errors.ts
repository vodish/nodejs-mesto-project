
export class ErrorObject extends Error {
  statusCode = 500;

  code: number | undefined = undefined;

  constructor(message: string) {
    super();
    this.message = message;
  }
}


export function error400(message: string) {
  const err = new ErrorObject(message);
  err.statusCode = 400;

  return err;
}

export function error401(message: string) {
  const err = new ErrorObject(message);
  err.statusCode = 400;

  return err;
}

export function error404(message: string) {
  const err = new ErrorObject(message);
  err.statusCode = 404;

  return err;
}
