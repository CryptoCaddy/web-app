import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { take, finalize } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

interface FormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'cdy-auth-login-form',
  templateUrl: './auth-login-form.component.html',
  styleUrls: [ './auth-login-form.component.scss' ],
})
export class AuthLoginFormComponent implements OnInit {

  /**
   * The login form object.
   *
   * @type {FormGroup}
   */
  public form: FormGroup;

  public formPending = false;

  /**
   * Creates an instance of LoginComponent.
   */
  constructor(private authService: AuthService) { }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.initForm();
  }

  /**
   * Callback when submitting the login form.
   *
   * @returns {void}
   */
  public onFormSubmit(formValue: FormValue): void {

    // If the form is invalid, enable displaying errors for invalid form controls.
    if (!this.form.valid) {
      this.form.updateValueAndValidity();
      return;
    }

    this.formPending = true;
    this.authService.signIn(formValue.email, formValue.password)
      .subscribe(
        null,
        (err: firebase.FirebaseError) => this.onLoginError(err),
      );
  }

  /**
   * Get a error massge to be displayed the given form control.
   *
   * @param {FormControl} control The form control to check for errors.
   * @returns {string} The error message to display.
   */
  public getErrorMessage(control: AbstractControl): string {
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
      'email': new FormControl(
        undefined,
        [ Validators.required ],
      ),
      'password': new FormControl(
        undefined,
        [ Validators.required ],
      ),
    });
  }

  private onLoginError(err: firebase.FirebaseError) {
    this.form.setErrors({ auth: err });
    this.formPending = false;
  }

}
