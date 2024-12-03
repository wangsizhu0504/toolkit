import { isArray } from '../is';

/**
 * Converts a value to an array if it is not already an array. If the input is an array, it returns the input as-is.
 *
 * @param {T[] | T} value - The value that needs to be converted.
 * @returns {T[]} A new array.
 *
 * @example
 * const array = [1, 2, 3];
 * const result = toArray(array); // [1, 2, 3]
 * const result = toArray(5); // [5]
 */
export function toArray<T>(value: T | T[]): T[] {
  return isArray(value) ? value : [value];
}
