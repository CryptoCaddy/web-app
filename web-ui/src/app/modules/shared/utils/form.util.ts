import { AbstractControl } from '@angular/forms';

/**
 * Get a error massge to be displayed the given form control.
 *
 * @param {FormControl} control The form control to check for errors.
 * @returns {string} The error message to display.
 */
export function getErrorMessage(control: AbstractControl): string {
  if (control.valid) { return ''; }

  if (control.hasError('required')) {
    return 'This field is mandatory.';
  }

  if (control.hasError('timezoneExists')) {
    return control.getError('timezoneExists').message;
  }

  if (control.hasError('array')) {
    return control.getError('array').message;
  }

  return 'Please check your input.';
}
