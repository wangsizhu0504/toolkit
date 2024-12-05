import { isMatch } from '../is/isMatch';
import { cloneDeep } from '../object/cloneDeep';
import { get } from '../object/get';
import { has } from '../object/has';
import { toKey } from './toKey';

export function matchesProperty(
  property: PropertyKey | readonly PropertyKey[],
  source: unknown,
): (target?: unknown) => boolean {
  switch (typeof property) {
    case 'object': {
      if (Object.is(property?.valueOf(), -0)) {
        property = '-0';
      }
      break;
    }
    case 'number': {
      property = toKey(property);
      break;
    }
  }

  source = cloneDeep(source);

  return function (target?: unknown) {
    const result = get(target, property as PropertyKey | PropertyKey[]);

    if (result === undefined) {
      return has(target, property as PropertyKey | PropertyKey[]);
    }

    if (source === undefined) {
      return result === undefined;
    }

    return isMatch(result, source);
  };
}
