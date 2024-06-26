import { constants } from 'http2';


export class ErrorObject extends Error {
  statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

  code: number | undefined = undefined;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}


export function error400(message: string) {
  return new ErrorObject(message, constants.HTTP_STATUS_BAD_REQUEST);
}

export function error401(message: string) {
  return new ErrorObject(message, constants.HTTP_STATUS_UNAUTHORIZED);
}

export function error403(message: string) {
  return new ErrorObject(message, constants.HTTP_STATUS_FORBIDDEN);
}

export function error404(message: string) {
  return new ErrorObject(message, constants.HTTP_STATUS_NOT_FOUND);
}

export function error409(message: string) {
  return new ErrorObject(message, constants.HTTP_STATUS_CONFLICT);
}
