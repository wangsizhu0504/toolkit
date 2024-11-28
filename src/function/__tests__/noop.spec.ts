import { describe, expect, it } from 'vitest';
import { noop } from '../noop';

describe('noop', () => {
  it('should do nothing and return undefined', () => {
    expect(noop()).toBeUndefined();
  });

  it('should ignore any arguments passed to it', () => {
    expect(noop()).toBeUndefined();
  });

  it('should be callable multiple times without effect', () => {
    noop();
    noop();
    noop();
    expect(noop()).toBeUndefined();
  });
});
