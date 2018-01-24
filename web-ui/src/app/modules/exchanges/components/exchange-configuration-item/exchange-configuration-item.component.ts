import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getHttpErrorMessage } from 'app/modules/shared/utils/http.util';
import { finalize } from 'rxjs/operators';

import { Exchange } from '../../models/exchange.model';
import { ExchangesProvider } from '../../storages/exchanges.provider';

const formFields: (keyof Exchange)[] = [
  'exchangeName',
  'exchangeKey',
  'exchangeSecret',
  'exchangePass',
];

@Component({
  selector: 'cdy-exchange-configuration-item',
  templateUrl: './exchange-configuration-item.component.html',
  styleUrls: [ './exchange-configuration-item.component.scss' ],
})
export class ExchangeConfigurationItemComponent implements OnInit, OnChanges {

  @Input()
  public exchange: Exchange;

  @Output()
  public submitChange = new EventEmitter<void>();

  public form: FormGroup;

  public savePending = false;
  public deletePending = false;

  constructor(
    private exchangesProvider: ExchangesProvider,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.exchange && changes.exchange.previousValue) {
      this.updateForm();
    }
  }

  public onSubmit(): void {
    if (this.savePending || this.deletePending) {
      return;
    }

    if (!this.form.valid) {
      return;
    }

    this.savePending = true;
    this.exchangesProvider.save(this.form.value)
      .pipe(finalize(() => this.savePending = false))
      .subscribe(
        () => this.submitChange.emit(),
        this.setFormError.bind(this),
      );
  }

  public onDelete($event): void {
    this.deletePending = true;
    this.exchangesProvider.remove(this.form.value)
      .pipe(finalize(() => this.deletePending = false))
      .subscribe(() => this.submitChange.emit());
  }

  /** initialize the form and its controls */
  private initForm(): void {
    this.form = new FormGroup({

      // exchange name
      // won't be displayed in ui
      exchangeName: new FormControl(
        this.exchange.exchangeName,
        [ Validators.required ],
      ),

      // api key
      exchangeKey: new FormControl(
        this.exchange.exchangeKey,
        [ Validators.required ],
      ),

      // api secret
      exchangeSecret: new FormControl(
        this.exchange.exchangeSecret,
        [ Validators.required ],
      ),

      // api passphrase
      exchangePass: new FormControl(
        this.exchange.exchangePass,
      ),

    });
  }

  /** update form with updated data from {@link exchange} input */
  private updateForm(): void {

    // udate form fields and reset errors
    for (const formField of formFields) {
      const control = this.form.get(formField);
      control.setValue(this.exchange[formField]);
      control.setErrors(null);
    }

    // reset form state
    this.form.markAsPristine();
    this.form.markAsUntouched();

  }

  private setFormError(err: HttpErrorResponse) {

    // @TODO use friendly messages instead of api error messages
    // @TODO distinct messages for specific error codes
    this.form.setErrors({
      generic: getHttpErrorMessage(err),
    });

  }

}
