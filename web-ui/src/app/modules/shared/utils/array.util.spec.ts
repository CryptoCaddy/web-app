import * as deepFreeze from 'deep-freeze';
import * as ArrayUtil from './array.util';

describe('ArrayUtil', () => {

  describe('sortObjectsByKey', () => {

    it('should be pure', () => {
      const input = deepFreeze([ { id: 1 }, { id: 0 } ]);
      const expected = [ { id: 0 }, { id: 1 } ];
      expect(ArrayUtil.sortByKey(input as any, 'id')).toEqual(expected);
    });

    it('should sort a given array of objects by a given key', () => {
      const input1 = deepFreeze([ { id: 1 }, { id: 2 }, { id: 0 } ]);
      const expected1 = [ { id: 0 }, { id: 1 }, { id: 2 } ];
      expect(ArrayUtil.sortByKey(input1 as any, 'id')).toEqual(expected1);

      const input2 = deepFreeze([
        { key: 'one', value: 10 },
        { key: 'two', value: 5 },
        { key: 'three', value: 3.33 },
        { key: 'four', value: 2.5 },
      ]);
      const expected2a = [
        { key: 'four', value: 2.5 },
        { key: 'one', value: 10 },
        { key: 'three', value: 3.33 },
        { key: 'two', value: 5 },
      ];
      expect(ArrayUtil.sortByKey(input2 as any, 'key')).toEqual(expected2a);

      const expected2b = [
        { key: 'four', value: 2.5 },
        { key: 'three', value: 3.33 },
        { key: 'two', value: 5 },
        { key: 'one', value: 10 },
      ];
      expect(ArrayUtil.sortByKey(input2 as any, 'value')).toEqual(expected2b);
    });

  });

});
