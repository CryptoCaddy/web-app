import { SelectOption } from 'app/modules/shared/models/select-option.model';
import * as R from 'ramda';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

export abstract class SelectOptionUtil {

  /** A ramda mapper that converts a given array of items to an array of SelectOptionss */
  public static asSelectOptions = (<T extends string|number>() => {
    return R.map((option: T): SelectOption<T> => ({ value: option, label: option.toString() }));
  })();

  /** Method to determine the label on autocompletes for select options. */
  public static getLabel<T>(option: SelectOption<T>|null): string {
    if (option == null || option.label == null) {
      return '';
    }

    if (typeof option.label.toString === 'function') {
      return option.label.toString();
    }

    return '';
  }

  /** Filter select options */
  public static filterByLabel(items: SelectOption<string>[], input: SelectOption<string>|string|null): SelectOption<string>[] {
    // Get the inputted string or - if an item is selected - its label
    const query: string = typeof input === 'string' ? input : (input && input.label || '');

    if (!input) {
      return items.slice();
    }

    return items.filter((item) => {
      return item.label.toLowerCase().includes(query.toLowerCase());
    });
  }

  /** Filter select options using an stream as data source. */
  public static filterByLabel$(
    items$: Observable<SelectOption<string>[]>,
    input: SelectOption<string>|string|null,
  ): Observable<SelectOption<string>[]> {

    // Get the inputted string or - if an item is selected - its label
    const query: string = typeof input === 'string' ? input : (input && input.label || '');

    if (!input) {
      return items$;
    }

    return items$.pipe(map((items) => {
      return items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
    }));
  }

}
