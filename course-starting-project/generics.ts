// const names: Array<number> = [];

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "abhi" }, { age: 22 });

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

class Storage<T> {
  data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
}

export {};
