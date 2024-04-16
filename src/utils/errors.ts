
export class ErrorObject extends Error {
  statusCode = 500;

  code: number | undefined = undefined;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}


export function error400(message: string) {
  return new ErrorObject(message, 400);
}

export function error401(message: string) {
  return new ErrorObject(message, 401);
}

export function error404(message: string) {
  return new ErrorObject(message, 404);
}
