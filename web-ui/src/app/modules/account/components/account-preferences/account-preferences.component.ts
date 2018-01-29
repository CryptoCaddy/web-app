import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthUser } from 'app/modules/auth/models/auth-user.model';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { SelectOption } from 'app/modules/shared/models/select-option.model';
import { getErrorMessage } from 'app/modules/shared/utils/form.util';
import { SelectOptionUtil } from 'app/modules/shared/utils/select-option.util';
import { TimezoneValidators } from 'app/modules/shared/validators/timezone.validators';
import * as moment from 'moment-timezone';
import * as R from 'ramda';
import { Observable } from 'rxjs/observable';
import { finalize, map, startWith } from 'rxjs/operators';

import { AccountService } from '../../services/account.service';

interface FormValue {
  fiat: string;
  rtimezone: string;
}

@Component({
  selector: 'cdy-account-preferences',
  templateUrl: './account-preferences.component.html',
  styleUrls: [ './account-preferences.component.scss' ],
})
export class AccountPreferencesComponent implements OnInit {

  /** The reactive form used in the template. */
  public form: FormGroup;

  /** The authenticated user's object. */
  public user: AuthUser;

  /** Generic error message retriever. */
  public getErrorMessage = getErrorMessage;

  /** Stream of filtered timezones to display. */
  public filteredTimezones$: Observable<SelectOption<string>[]>;

  /** Stream of filtered fiats to display. */
  public filteredFiats$: Observable<SelectOption<string>[]>;

  /** Determine displayed label of autocompletes. */
  public selectOptionDisplayFn = SelectOptionUtil.getLabel;

  /** Whether a form subission request is pending. */
  public formPending = false;

  /** Complete list of available fiats. */
  private fiats: SelectOption<string>[] =
    <SelectOption<string>[]> R.compose(
      R.sortBy(R.prop('label')),
    )([
      { value: 'usd', label: 'United States dollar - USD ($)' },
      { value: 'eur', label: 'Euro - EUR (€)' },
      { value: 'jpy', label: 'Japanese yen - JPY (¥)' },
      { value: 'gbp', label: 'Pound Sterling - GPB (£)' },
      { value: 'aud', label: 'Australian dollar - AUD (A$)' },
      { value: 'cad', label: 'Canadian dollar - CAD (C$)' },
      { value: 'chf', label: 'Swiss franc - CHF (Fr)' },
      { value: 'cny', label: 'Renminbi - CNY (元;)' },
      { value: 'sek', label: 'Swedish krona - SEK (kr)' },
      { value: 'NDZ', label: 'New Zealand dollar - NZD (NZ$)' },
    ]);

  /** Complete list of available timezones. */
  private timezones: SelectOption<string>[] =
    <SelectOption<string>[]> R.compose(
      R.sortBy(R.prop('label')),
      SelectOptionUtil.asSelectOptions,
    )(moment.tz.names());

  constructor(
    private account: AccountService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  /** @memberof OnInit */
  public ngOnInit() {

    // Update the form values as soon as the user changes.
    this.auth.user$.subscribe((user) => this.updateUser(user));

    this.initForm();
  }

  /** Callback when submitting the form. */
  public onFormSubmit(formValue: FormValue): void {

    // If the form is invalid, enable displaying errors for invalid form controls.
    if (!this.form.valid) {
      this.form.updateValueAndValidity();
      return;
    }

    this.formPending = true;

    // @TODO implement saving
    this.account.updateAccount()
      .pipe(finalize(() => this.formPending = false))
      .subscribe(() => {
        this.snackBar.open('Preferences saved.', null, { duration: 3000 });
      });
  }

  /** Initialize the form. */
  private initForm(): void {
    this.form = new FormGroup({
      fiat: new FormControl(
        this.user && this.user.fiat,
        [ Validators.required ],
      ),
      timezone: new FormControl(
        this.user && this.user.timezone,
        [ Validators.required, TimezoneValidators.exists ],
      ),
    });

    this.filteredTimezones$ = this.form.get('timezone').valueChanges
      .pipe(
        startWith(null),
        map((input: string|null) => SelectOptionUtil.filterByLabel(this.timezones, input)),
      );

    this.filteredFiats$ = this.form.get('fiat').valueChanges
      .pipe(
        startWith(null),
        map((input: string|null) => SelectOptionUtil.filterByLabel(this.fiats, input)),
      );
  }

  /** Update the user's form values. */
  private updateUser(user: AuthUser): void {
    this.user = user;

    if (this.form) {
      this.form.get('fiat').setValue(user ? user.fiat : null);
      this.form.get('timezone').setValue(user ? user.timezone : null);
    }
  }

}
