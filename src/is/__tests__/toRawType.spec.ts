import { describe, expect, it } from 'vitest';
import { toRawType } from '../toRawType';

describe('toRawType', () => {
  it('should return the tag of the value', () => {
    expect(toRawType(null)).toBe('[object Null]');
    expect(toRawType(undefined)).toBe('[object Undefined]');
    expect(toRawType(1)).toBe('[object Number]');
    expect(toRawType('')).toBe('[object String]');
    expect(toRawType(true)).toBe('[object Boolean]');
    expect(toRawType(Symbol())).toBe('[object Symbol]');
    expect(toRawType([])).toBe('[object Array]');
    expect(toRawType({})).toBe('[object Object]');
    expect(toRawType(() => {})).toBe('[object Function]');
    expect(toRawType(new Date())).toBe('[object Date]');
    expect(toRawType(/./)).toBe('[object RegExp]');
  });

  it('should return the tag of the custom object', () => {
    class Custom {}
    expect(toRawType(new Custom())).toBe('[object Object]');
  });
});
