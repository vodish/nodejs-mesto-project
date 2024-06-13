
export function crashTest() {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}
