

export interface ISomeObject {
  [key: string]: any
}

export function less(obj: ISomeObject, ...props: string[]) {
  const obj1 = JSON.parse(JSON.stringify(obj)) as ISomeObject;

  return props.reduce((result: ISomeObject, prop) => {
    if (result[prop] !== undefined) {
      delete result[prop];
    }
    return result;
  }, obj1);
}
