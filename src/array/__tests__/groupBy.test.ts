import { describe, expect, it } from 'vitest';
import { groupBy } from '../groupBy';

describe('groupBy', () => {
  it('should group objects by a property', () => {
    const input = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
    ];
    const result = groupBy(input, item => item.category);
    expect(result).toEqual({
      fruit: [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'banana' },
      ],
      vegetable: [
        { category: 'vegetable', name: 'carrot' },
      ],
    });
  });

  it('should handle empty array', () => {
    expect(groupBy([], item => item)).toEqual({});
  });

  it('should group numbers by their floor value', () => {
    const input = [1.2, 1.9, 2.1, 2.9, 3.0];
    const result = groupBy(input, Math.floor);
    expect(result).toEqual({
      1: [1.2, 1.9],
      2: [2.1, 2.9],
      3: [3.0],
    });
  });

  it('should group strings by length', () => {
    const input = ['one', 'two', 'three', 'four', 'five'];
    const result = groupBy(input, str => str.length);
    expect(result).toEqual({
      3: ['one', 'two'],
      4: ['four', 'five'],
      5: ['three'],
    });
  });

  it('should handle single item array', () => {
    const input = [{ id: 1, value: 'test' }];
    const result = groupBy(input, item => item.value);
    expect(result).toEqual({
      test: [{ id: 1, value: 'test' }],
    });
  });

  it('should group by complex key function', () => {
    const input = [
      { data: { type: 'A', value: 1 } },
      { data: { type: 'A', value: 2 } },
      { data: { type: 'B', value: 3 } },
    ];
    const result = groupBy(input, item => item.data.type);
    expect(result).toEqual({
      A: [
        { data: { type: 'A', value: 1 } },
        { data: { type: 'A', value: 2 } },
      ],
      B: [
        { data: { type: 'B', value: 3 } },
      ],
    });
  });
});
