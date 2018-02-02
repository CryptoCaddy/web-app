import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, take } from 'rxjs/operators';

import { SelectOption } from '../models/select-option.model';

export class ArrayValidators {

  /** Makes sure the value is included in a given array. */
  public static includedIn(array: any[]): ValidatorFn {
    return function(control: AbstractControl) {
      const { input, asSelectOption } = getControlValue(control);
      if (!input) { return; }

      return arrayIncludes(array, input, asSelectOption);
    };
  }

  /** Makes sure the value is included in a given stream of an array. */
  public static includedIn$(array$: Observable<any[]>): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const { input, asSelectOption } = getControlValue(control);
      if (!input) { return of(null); }

      return array$.pipe(
        take(1),
        map((array) => arrayIncludes(array, input, asSelectOption)),
      );
    };
  }

}

/** Determines the input value of an control an whether a SelectOption was used. */
function getControlValue(control: AbstractControl): { input?: string, asSelectOption?: boolean } {
  if (!control || !control.value) {
    return { };
  } else if (control.value.label) {
    return { input: (<SelectOption<string>>control.value).value, asSelectOption: true };
  } else {
    return { input: control.value, asSelectOption: false };
  }
}

/** Checks if an array (of either SelectOptions or primitives includes a given value) */
function arrayIncludes(array: any[], input: string, asSelectOption: boolean) {
  if (asSelectOption) {
    if (array.map((item) => item.value).includes(input)) {
      return null;
    }
  } else {
    if (array.includes(input)) {
      return null;
    }
  }

  return { array: { valid: false, message: 'Please select a valid option.' } };
}
