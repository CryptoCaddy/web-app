import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'cdy-login',
  templateUrl: './page.html',
  styleUrls: [ './page.scss' ],
})
export class LoginPage implements OnInit {

  /**
   * The login form object.
   *
   * @type {FormGroup}
   */
  public form: FormGroup;

  /**
   * Creates an instance of LoginComponent.
   */
  constructor() { }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.initForm();
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

    console.info('TBI: Login');
  }

  /**
   * Get a error massge to be displayed the given form control.
   *
   * @param {FormControl} control The form control to check for errors.
   * @returns {string} The error message to display.
   */
  public getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is mandatory.';
    }

    return '';
  }

  /**
   * Initialize the form.
   *
   * @private
   * @returns {void}
   */
  private initForm(): void {
    this.form = new FormGroup({
      'username': new FormControl(
        undefined,
        [ Validators.required ],
      ),
      'password': new FormControl(
        undefined,
        [ Validators.required ],
      ),
    });
  }

}
