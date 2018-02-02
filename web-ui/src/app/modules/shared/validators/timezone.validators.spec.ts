import { TimezoneValidators } from './timezone.validators';
import { FormControl, Validators } from '@angular/forms';
import { SelectOption } from '../models/select-option.model';

describe('TimezoneValidators', () => {
  let control: FormControl;

  describe('::exists', () => {
    beforeEach(() => {
      control = new FormControl(null, [ TimezoneValidators.exists ]);
    });

    describe('using text values', () => {
      it('should only validate if a value is given', () => {
        expect(control.errors).toBeNull();

        control.setValue(undefined);
        expect(control.errors).toBeNull();

        control.setValue('');
        expect(control.errors).toBeNull();
      });

      it('should check if a given timezone exists', () => {
        control.setValue('Nonexistent/Timezone');
        expect(control.errors).toBeDefined();
        expect(control.errors.timezoneExists).toBeDefined();
        expect(control.errors.timezoneExists.message).toEqual('Unknown timezone. Please select one from the list.');

        control.setValue('Europe/Amsterdam');
        expect(control.errors).toBeNull();
      });
    });

    describe('using Select options', () => {
      it('should check if a given timezone exists', () => {
        control.setValue(<SelectOption<string>>{ value: 'Nonexistent/Timezone', label: 'Nonexistent/Timezone' });
        expect(control.errors).toBeDefined();
        expect(control.errors.timezoneExists).toBeDefined();
        expect(control.errors.timezoneExists.message).toEqual('Unknown timezone. Please select one from the list.');

        control.setValue(<SelectOption<string>>{ value: 'Europe/Amsterdam', label: 'Europe/Amsterdam' });
        expect(control.errors).toBeNull();
      });
    });
  });

});
