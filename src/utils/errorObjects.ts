//
//
// интерфейсы
export interface Error400 {
  statusCode: number,
}

export interface Error404 extends Error {
  statusCode: number,
}

//export interface ErrorObject extends Error {
//   statusCode: number,
// }

//
//
//
//
// ошибки
export class Error400 extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export class Error404 extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

