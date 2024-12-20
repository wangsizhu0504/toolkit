/**
 * Gets the `toStringTag` of `value`.
 *
 * @param {T} value The value to query.
 * @returns {string} Returns the `Object.prototype.toString.call` result.
 */
export function toRawType<T>(value: T): string {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return Object.prototype.toString.call(value);
}
