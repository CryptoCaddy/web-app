import * as deepFreeze from 'deep-freeze';
import * as ArrayUtil from './array.util';

interface TestType {
  id: number;
  label: string;
}

describe('ArrayUtil', () => {

  describe('::trackByType', () => {
    let trackTestTypeBy;

    beforeEach(() => {
      trackTestTypeBy = ArrayUtil.trackTypeBy<TestType>();
    });

    it('should return a curried TrackByFunction', () => {
      expect(typeof trackTestTypeBy).toEqual('function');
    });

    describe('that creates another curried function which', () => {
      it('should track items by a given property', () => {
        expect.assertions(4);

        const list = [
          { id: 1, label: 'one' },
          { id: 2, label: 'two' },
        ];

        const trackTestTypeById = trackTestTypeBy('id');
        for (let i = 0; i < list.length; i++) {
          expect(trackTestTypeById(i, list[i])).toEqual(list[i].id);
        }

        const trackTestTypeByLabel = trackTestTypeBy('label');
        for (let i = 0; i < list.length; i++) {
          expect(trackTestTypeByLabel(i, list[i])).toEqual(list[i].label);
        }
      });

      it('should throw if a given item does not have the curried property', () => {
        expect.assertions(2);

        const list = [
          { id: 1, label: 'one' },
          { id: 2, label: 'two' },
        ];

        const trackTestTypeByName = trackTestTypeBy('name');
        for (let i = 0; i < list.length; i++) {
          expect(() => trackTestTypeByName(i, list[i])).toThrowError();
        }
      });
    });
  });

  describe('::sortObjectsByKey', () => {
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
