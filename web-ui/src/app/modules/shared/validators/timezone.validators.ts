import { FormControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment-timezone';

export class TimezoneValidators {

  public static exists: ValidatorFn = (formControl: FormControl) => {
    let input: string;

    if (formControl.value && formControl.value.label) {
      input = formControl.value.label;
    } else {
      input = formControl.value;
    }

    if (moment.tz.names().includes(input)) {
      return null;
    }

    return { timezoneExists: { valid: false, message: 'Unknown timezone. Please select one from the list.' } };
  }

}
