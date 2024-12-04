import { isArrayLike } from '../is/isArrayLike';
import { isObject } from '../is/isObject';
import { eq } from './eq';
import { isIndex } from './isIndex';

export function isIterateeCall(value: unknown, index: unknown, object: unknown): boolean {
  if (!isObject(object)) {
    return false;
  }

  if (
    (typeof index === 'number' && isArrayLike(object) && isIndex(index) && index < object.length)
    || (typeof index === 'string' && index in object)
  ) {
    return eq((object as any)[index], value);
  }

  return false;
}
