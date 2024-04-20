
interface ISomeObject {
  [key: string]: any
}

export function less(obj: ISomeObject, ...props: string[]) {
  obj = JSON.parse(JSON.stringify(obj));

  return props.reduce(function (result: ISomeObject, prop) {
    if (result[prop] !== undefined) {
      delete result[prop];
    }
    return result;
  }, obj);
}
