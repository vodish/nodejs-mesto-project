

export type TSomeObject =  {
  [key: string]: any
}

export function less(obj: TSomeObject, ...props: string[]) {
  const obj1 = JSON.parse(JSON.stringify(obj)) as TSomeObject;

  return props.reduce((result: TSomeObject, prop) => {
    if (result[prop] !== undefined) {
      delete result[prop];
    }
    return result;
  }, obj1);
}
