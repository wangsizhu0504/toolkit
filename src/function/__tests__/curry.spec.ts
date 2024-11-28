import { describe, expect, it } from 'vitest';
import { curry } from '../curry';

describe('curry', () => {
  it('should curry a function with no arguments', () => {
    const noArgs = () => 42;
    const curried = curry(noArgs);
    expect(curried()).toBe(42);
  });

  it('should curry a function with one argument', () => {
    const oneArg = (x: number) => x * 2;
    const curried = curry(oneArg);
    expect(curried(5)).toBe(10);
  });

  it('should curry a function with two arguments', () => {
    const twoArgs = (x: number, y: number) => x + y;
    const curried = curry(twoArgs);
    expect(curried(1)(2)).toBe(3);
  });

  it('should curry a function with three arguments', () => {
    const threeArgs = (x: number, y: number, z: number) => x + y + z;
    const curried = curry(threeArgs);
    const step1 = curried(1);
    const step2 = step1(2);
    const result = step2(3);
    expect(result).toBe(6);
  });

  it('should curry a function with four arguments', () => {
    const fourArgs = (a: number, b: number, c: number, d: number) => a + b + c + d;
    const curried = curry(fourArgs);
    expect(curried(1)(2)(3)(4)).toBe(10);
  });

  it('should curry a function with five arguments', () => {
    const fiveArgs = (a: number, b: number, c: number, d: number, e: number) => a + b + c + d + e;
    const curried = curry(fiveArgs);
    expect(curried(1)(2)(3)(4)(5)).toBe(15);
  });
});
