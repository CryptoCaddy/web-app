import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { BaseFormAbstractComponent } from 'app/modules/shared/components/base-form/base-form.abstract-component';
import * as firebase from 'firebase';
import { FirebaseError } from 'firebase/app';
import { finalize } from 'rxjs/operators';

interface FormValue {
  email: string;
  password: string;
  passwordRepeat: string;
}

@Component({
  selector: 'cdy-account-register-form',
  templateUrl: './account-register-form.component.html',
  styleUrls: [ './account-register-form.component.scss' ],
})
export class AccountRegisterFormComponent extends BaseFormAbstractComponent {

  /**
   * Whether the form should link the credentials with the currently logged in
   * user instead of creating a new account.
   */
  @Input()
  public linkAccount = false;

  constructor(private auth: AuthService) {
    super();
  }

  /** @memberof BaseFormAbstractComponent */
  public submit(): void {
    if (!this.canSubmit()) {
      return;
    }

    const formValue: FormValue = this.form.value;

    this.pending.next(true);
    if (this.linkAccount) {
      const credential = firebase.auth.EmailAuthProvider.credential(formValue.email, formValue.password);
      // Link new credentials with the currently logged in account
      this.auth.linkWithCredential(credential)
        .pipe(finalize(() => this.pending.next(false)))
        .subscribe(
          () => this.completed.next(true),
          (err) => this.setFormError(err),
        );
    } else {
      // Sign up a new account
      this.auth.signUp(formValue.email, formValue.password)
        .pipe(finalize(() => this.pending.next(false)))
        .subscribe(
          () => this.completed.next(true),
          (err) => this.setFormError(err),
        );
    }
  }

  /** @memberof BaseFormAbstractComponent */
  protected initForm(): void {
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
