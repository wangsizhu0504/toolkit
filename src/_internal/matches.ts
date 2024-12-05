import { isMatch } from '../is/isMatch';
import { cloneDeep } from '../object/cloneDeep';

export function matches(source: unknown): (target: unknown) => boolean {
  source = cloneDeep(source);

  return (target?: unknown): boolean => {
    return isMatch(target, source);
  };
}
