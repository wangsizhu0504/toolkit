import { get } from '../object/get';

export function property(path: PropertyKey | readonly PropertyKey[]): (object: unknown) => any {
  return function (object: unknown) {
    return get(object, path);
  };
}
