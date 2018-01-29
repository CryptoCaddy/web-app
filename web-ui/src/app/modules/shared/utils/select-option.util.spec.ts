import { SelectOptionUtil } from './select-option.util';
import { SelectOption } from '../models/select-option.model';

describe('SelectOptionUtil', () => {

  describe('::asSelectOptions', () => {
    it('should convert a given array of strings or numbers into an array of SelectOptions', () => {
      expect(SelectOptionUtil.asSelectOptions([ 1, 2, 3 ])).toEqual([
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
      ]);

      expect(SelectOptionUtil.asSelectOptions([ 'val1', 'val2', 'val3' ])).toEqual([
        { value: 'val1', label: 'val1' },
        { value: 'val2', label: 'val2' },
        { value: 'val3', label: 'val3' },
      ]);
    });
  });

  describe('getLabel', () => {
    it('should return the label to display for an select option', () => {
      expect(SelectOptionUtil.getLabel({ value: 1, label: 'one' })).toEqual('one');
      expect(SelectOptionUtil.getLabel({ value: 1, label: '2' })).toEqual('2');
      expect(SelectOptionUtil.getLabel({ value: 1, label: '{ some }' })).toEqual('{ some }');
      expect(SelectOptionUtil.getLabel({ value: 1, label: 1 } as any)).toEqual('1');
      expect(SelectOptionUtil.getLabel({ value: 1, label: [ 'foo', 'bar' ] } as any)).toEqual('foo,bar');
      expect(SelectOptionUtil.getLabel({ value: 1, label: { foo: 'bar' } } as any)).toEqual('[object Object]');
    });

    it('should return an empty string if not label could be determined', () => {
      expect(SelectOptionUtil.getLabel({ value: 1, label: null } as any)).toEqual('');
      expect(SelectOptionUtil.getLabel({ value: 1, label: undefined } as any)).toEqual('');
      expect(SelectOptionUtil.getLabel({ value: 1, label: [ ] } as any)).toEqual('');
    });
  });

  describe('filterByLabel', () => {
    const options: SelectOption<any>[] = [
      { value: 1, label: 'New York' },
      { value: 2, label: 'Tokyo' },
      { value: 3, label: 'Munich' },
      { value: 4, label: 'Sidney' },
    ];

    it('should filter a given array of select options by their label matching a given substring', () => {
      expect(SelectOptionUtil.filterByLabel(options, 'yo'))
        .toEqual([
          { value: 1, label: 'New York' },
          { value: 2, label: 'Tokyo' },
        ]);

      expect(SelectOptionUtil.filterByLabel(options, ' '))
        .toEqual([
          { value: 1, label: 'New York' },
        ]);

      expect(SelectOptionUtil.filterByLabel(options, 'wash'))
        .toEqual([ ]);
    });
  });

});
