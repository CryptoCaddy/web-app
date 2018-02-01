import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'app/modules/shared/components/base-form/base-form.component';
import { SelectOption } from 'app/modules/shared/models/select-option.model';
import { SelectOptionUtil } from 'app/modules/shared/utils/select-option.util';
import { TimezoneValidators } from 'app/modules/shared/validators/timezone.validators';
import * as moment from 'moment-timezone';
import * as R from 'ramda';
import { Observable } from 'rxjs/observable';
import { finalize, map, startWith } from 'rxjs/operators';

import { Account } from '../../models/account.model';
import { AccountProvider } from '../../storage/account-provider.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthUser } from '../../../auth/models/auth-user.model';
import { Logger } from '../../../shared/utils/logger.util';

interface FormValue {
  fiat: SelectOption<string>;
  timezone: SelectOption<string>;
}

@Component({
  selector: 'cdy-account-preferences-form',
  templateUrl: './account-preferences-form.component.html',
  styleUrls: [ './account-preferences-form.component.scss' ],
})
export class AccountPreferencesFormComponent extends BaseFormComponent implements OnInit {

  /** The account object. */
  public account: Account;
  private user: AuthUser;

  /** Stream of filtered timezones to display. */
  public filteredTimezones$: Observable<SelectOption<string>[]>;

  /** Stream of filtered fiats to display. */
  public filteredFiats$: Observable<SelectOption<string>[]>;

  /** Determine displayed label of autocompletes. */
  public selectOptionDisplayFn = SelectOptionUtil.getLabel;

  // @TODO get list from backend
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

  // @TODO get list from backend
  /** Complete list of available timezones. */
  private timezones: SelectOption<string>[] =
    <SelectOption<string>[]> R.compose(
      R.sortBy(R.prop('label')),
      SelectOptionUtil.asSelectOptions,
    )(moment.tz.names());

  constructor(
    private accountProvider: AccountProvider,
    private auth: AuthService,
  ) {
    super();
  }

  /** @memberof OnInit */
  public ngOnInit() {
    super.ngOnInit();

    // Update the form values as soon as the account changes.
    // @TODO: logic for objects instead of array of objects
    this.accountProvider.data$.subscribe((account) => this.syncAccount(account[0]));
    this.auth.user$.subscribe((user) => this.user = user);
  }

  /** Callback when submitting the form. */
  public submit(): void {
    if (!this.canSubmit()) {
      return;
    }

    const formValue: FormValue = this.form.value;

    this.pending.next(true);

    this.accountProvider.update({
      email: this.user.email,
      fiat: formValue.fiat.value,
      timezone: formValue.timezone.value,
    })
      .pipe(finalize(() => this.pending.next(false)))
      .subscribe(() => {
        this.completed.next(true);
      });
  }

  /** Initialize the form. */
  protected initForm(): void {
    this.form = new FormGroup({
      fiat: new FormControl(
        this.account && this.account.fiat,
        [ Validators.required ],
      ),
      timezone: new FormControl(
        this.account && this.account.timezone,
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

  /** Update the account form values. */
  private syncAccount(account: Account): void {
    this.account = account;

    if (this.form) {
      Logger.logGroup(this.constructor.name, 'syncAccount', account);

      if (account && account.fiat) {
        this.form.get('fiat').setValue(R.find(R.propEq('value', account.fiat))(this.fiats));
      }

      if (account && account.timezone) {
        this.form.get('timezone').setValue(R.find(R.propEq('value', account.timezone))(this.timezones));
      }
    }
  }

}
