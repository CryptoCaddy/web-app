import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { AuthService } from '../../services/auth.service';

interface FormValue {
  email: string;
  password: string;
  passwordRepeat: string;
}

@Component({
  selector: 'cdy-auth-register-form',
  templateUrl: './auth-register-form.component.html',
  styleUrls: [ './auth-register-form.component.scss' ],
})
export class AuthRegisterFormComponent implements OnInit {

  /**
   * The login form object.
   *
   * @type {FormGroup}
   */
  public form: FormGroup;

  constructor(private auth: AuthService) { }

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

    this.auth.signUp(formValue.email, formValue.password)
      .subscribe(null, (err) => this.setFormError(err));
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
      'passwordRepeat': new FormControl(
        undefined,
        [ Validators.required ],
      ),
    });
  }

  /** set a global error on the form */
  private setFormError(err: FirebaseError) {
    this.form.setErrors({ generic: err.message });
  }

}
