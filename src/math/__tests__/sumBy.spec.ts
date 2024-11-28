import { describe, expect, it } from 'vitest';
import { sumBy } from '../sumBy';

describe('sumBy', () => {
  it('should sum numbers from objects using property selector', () => {
    const objects = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(sumBy(objects, obj => obj.value)).toBe(6);
  });

  it('should sum numbers from objects using nested property selector', () => {
    const objects = [
      { nested: { value: 1 } },
      { nested: { value: 2 } },
      { nested: { value: 3 } },
    ];
    expect(sumBy(objects, obj => obj.nested.value)).toBe(6);
  });

  it('should handle empty array', () => {
    const emptyArray: Array<{ value: number }> = [];
    expect(sumBy(emptyArray, obj => obj.value)).toBe(0);
  });

  it('should handle array with one element', () => {
    const objects = [{ value: 5 }];
    expect(sumBy(objects, obj => obj.value)).toBe(5);
  });

  it('should handle negative numbers', () => {
    const objects = [{ value: -1 }, { value: -2 }, { value: -3 }];
    expect(sumBy(objects, obj => obj.value)).toBe(-6);
  });

  it('should handle mixed positive and negative numbers', () => {
    const objects = [{ value: -1 }, { value: 2 }, { value: -3 }, { value: 4 }];
    expect(sumBy(objects, obj => obj.value)).toBe(2);
  });

  it('should handle decimal numbers', () => {
    const objects = [{ value: 0.1 }, { value: 0.2 }, { value: 0.3 }];
    expect(sumBy(objects, obj => obj.value)).toBeCloseTo(0.6);
  });

  it('should handle complex value transformations', () => {
    const objects = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }];
    expect(sumBy(objects, obj => obj.x * obj.y)).toBe(44); // (1*2 + 3*4 + 5*6)
  });

  it('should handle arrays of primitive values', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(sumBy(numbers, n => n * 2)).toBe(30);
  });

  it('should handle transformation that returns zero', () => {
    const objects = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(sumBy(objects, () => 0)).toBe(0);
  });

  it('should handle readonly arrays', () => {
    const readonlyArray: ReadonlyArray<{ value: number }> = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
    ] as const;
    expect(sumBy(readonlyArray, obj => obj.value)).toBe(6);
  });

  it('should handle large numbers', () => {
    const objects = [
      { value: 1e6 },
      { value: 2e6 },
      { value: 3e6 },
    ];
    expect(sumBy(objects, obj => obj.value)).toBe(6e6);
  });

  it('should maintain precision for decimal calculations', () => {
    const objects = [
      { value: 0.1 },
      { value: 0.2 },
    ];
    expect(sumBy(objects, obj => obj.value)).toBeCloseTo(0.3);
  });
});
