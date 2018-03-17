import deepFreeze from 'deep-freeze';

import * as ArrayUtil from '../array';

describe('ArrayUtil', () => {
  describe('sortBy', () => {
    const items = deepFreeze([
      { key: 3, label: 'd' },
      { key: 2, label: 'C' },
      { key: 1, label: 'b' },
      { key: 0, label: 'A' },
    ]);

    it('should be pure', () => {
      expect(() => ArrayUtil.sortBy(items as any, 'key')).not.toThrow();
    });

    it('should sort objects by a given key', () => {
      expect(ArrayUtil.sortBy(items as any, 'label')).toEqual([
        { key: 0, label: 'A' },
        { key: 1, label: 'b' },
        { key: 2, label: 'C' },
        { key: 3, label: 'd' },
      ]);

      expect(ArrayUtil.sortBy(items as any, 'key')).toEqual([
        { key: 0, label: 'A' },
        { key: 1, label: 'b' },
        { key: 2, label: 'C' },
        { key: 3, label: 'd' },
      ]);
    });

    it('should sort case sensitive', () => {
      expect(ArrayUtil.sortBy(items as any, 'label', true)).toEqual([
        { key: 0, label: 'A' },
        { key: 2, label: 'C' },
        { key: 1, label: 'b' },
        { key: 3, label: 'd' },
      ]);

      expect(ArrayUtil.sortBy(items as any, 'key', true)).toEqual([
        { key: 0, label: 'A' },
        { key: 1, label: 'b' },
        { key: 2, label: 'C' },
        { key: 3, label: 'd' },
      ]);
    });
  });
});
