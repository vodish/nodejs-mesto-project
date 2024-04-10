
export interface ErrorObject extends Error {
  statusCode?: number
}

//
//
//
export class Error400 extends Error implements ErrorObject {
  statusCode = 400;

  constructor(message: string) {
    super(message);
  }
}

export class Error404 extends Error implements ErrorObject {
  statusCode = 404;

  constructor(message: string) {
    super(message);
  }
}

