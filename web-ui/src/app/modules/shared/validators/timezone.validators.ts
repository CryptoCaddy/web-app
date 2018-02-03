import { FormControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment-timezone';
import { SelectOption } from '../models/select-option.model';

export class TimezoneValidators {

  public static exists: ValidatorFn = (formControl: FormControl) => {
    let input: string;

    if (!formControl || !formControl.value) {
      return null;
    } else if (formControl.value && formControl.value.label) {
      input = (<SelectOption<string>>formControl.value).value;
    } else {
      input = formControl.value;
    }

    if (moment.tz.names().includes(input)) {
      return null;
    }

    return { timezoneExists: { valid: false, message: 'Unknown timezone. Please select one from the list.' } };
  }

}
