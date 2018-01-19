import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from 'app/modules/shared/models/select-option.model';

import { ExchangeWalletService } from '../../services/exchange-wallet.service';

@Component({
  selector: 'cdy-exchange-wallet-form',
  templateUrl: './exchange-wallet-form.component.html',
  styleUrls: [ './exchange-wallet-form.component.scss' ],
})
export class ExchangeWalletFormComponent implements OnInit {

  public form: FormGroup;

  public apiErrorMessage: string;

  public availableExchanges: SelectOption[] = [
    { value: 'binance', label: 'Binance' },
    { value: 'bittrex', label: 'Bittrex' },
    { value: 'gdax', label: 'GDAX' },
  ];

  constructor(
    private exchangeWalletService: ExchangeWalletService,
  ) { }

  ngOnInit() {
    this.initForm();

    this.exchangeWalletService.database.errorChange
      .subscribe((err: string) => this.apiErrorMessage = err);
  }

  /**
   * Callback when submitting the login form.
   *
   * @returns {void}
   */
  public onFormSubmit(): void {

    // If the form is invalid, enable displaying errors for invalid form controls.
    if (!this.form.valid) {
      this.form.updateValueAndValidity();
      return;
    }

    const { exchange, apiKey, apiSecret, passsword } = this.form.value;
    this.exchangeWalletService.initialize(exchange, apiKey, apiSecret, passsword);
  }

  /**
   * Get a error massge to be displayed the given form control.
   *
   * @param {FormControl} control The form control to check for errors.
   * @returns The error message to display.
   */
  public getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'This field is mandatory.';
    }

    return '';
  }

  private initForm(): void {
    this.form = new FormGroup({
      exchange: new FormControl(
        undefined,
        [ Validators.required ],
      ),
      apiKey: new FormControl(
        undefined,
        [ Validators.required ],
      ),
      apiSecret: new FormControl(
        undefined,
        [ Validators.required ],
      ),
      passphrase: new FormControl(
        undefined,
        [ ],
      ),
    });
  }

}
