import { fakeAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs/observable/of';

import { SelectOption } from '../models/select-option.model';
import { ArrayValidators } from './array.validators';

describe('ArrayValidators', () => {
  let control: FormControl;

  beforeEach(() => {
    control = null;
  });

  describe('::includedIn', () => {
    describe('using text values', () => {
      beforeEach(() => {
        control = new FormControl(null, [ ArrayValidators.includedIn([ 'one', 'three' ]) ]);
      });

      it('should only validate if a value is given', () => {
        expect(control.errors).toBeNull();

        control.setValue(undefined);
        expect(control.errors).toBeNull();

        control.setValue('');
        expect(control.errors).toBeNull();
      });

      it('should check if a given item is included in the array', () => {
        control.setValue('zero');
        expect(control.errors).toBeDefined();
        expect(control.errors.array).toBeDefined();
        expect(control.errors.array.message).toEqual('Please select a valid option.');

        control.setValue('one');
        expect(control.errors).toBeNull();
      });
    });

    describe('using Select options', () => {
      beforeEach(() => {
        control = new FormControl(null, [ ArrayValidators.includedIn([
          { value: 'one', label: '1' },
          { value: 'three', label: '3' },
        ]) ]);
      });

      it('should check if a given SelectOption is included in the array', () => {
        control.setValue(<SelectOption<string>>{ value: 'two', label: '2' });
        expect(control.errors).toBeDefined();
        expect(control.errors.array).toBeDefined();
        expect(control.errors.array.message).toEqual('Please select a valid option.');

        control.setValue(<SelectOption<string>>{ value: 'three', label: '3' });
        expect(control.errors).toBeNull();
      });
    });
  });

  describe('::includedIn$', () => {
    describe('using text values', () => {
      beforeEach(() => {
        control = new FormControl(null, null, [ ArrayValidators.includedIn$(of([ 'one', 'three' ])) ]);
      });

      it('should only validate if a value is given', () => {
        expect(control.errors).toBeNull();

        control.setValue(undefined);
        expect(control.errors).toBeNull();

        control.setValue('');
        expect(control.errors).toBeNull();
      });

      it('should check if a given item is included in the array', fakeAsync(() => {
        control.setValue('zero');
        expect(control.errors).toBeDefined();
        expect(control.errors.array).toBeDefined();
        expect(control.errors.array.message).toEqual('Please select a valid option.');

        control.setValue('one');
        expect(control.errors).toBeNull();
      }));
    });

    describe('using Select options', () => {
      beforeEach(() => {
        control = new FormControl(null, null, [ ArrayValidators.includedIn$(of([
          { value: 'one', label: '1' },
          { value: 'three', label: '3' },
        ])) ]);
      });

      it('should check if a given SelectOption is included in the array', () => {
        control.setValue(<SelectOption<string>>{ value: 'two', label: '2' });
        expect(control.errors).toBeDefined();
        expect(control.errors.array).toBeDefined();
        expect(control.errors.array.message).toEqual('Please select a valid option.');

        control.setValue(<SelectOption<string>>{ value: 'three', label: '3' });
        expect(control.errors).toBeNull();
      });
    });
  });

});
