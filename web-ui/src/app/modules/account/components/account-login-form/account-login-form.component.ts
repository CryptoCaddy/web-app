import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { BaseFormAbstractComponent } from 'app/modules/shared/components/base-form/base-form.abstract-component';
import { finalize } from 'rxjs/operators';

interface FormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'cdy-account-login-form',
  templateUrl: './account-login-form.component.html',
  styleUrls: [ './account-login-form.component.scss' ],
})
export class AccountLoginFormComponent extends BaseFormAbstractComponent {

  /**
   * Creates an instance of LoginComponent.
   */
  constructor(private authService: AuthService) {
    super();
  }

  /** @memberof BaseFormAbstractComponent */
  public submit(): void {
    if (!this.canSubmit()) {
      return;
    }

    const formValue: FormValue = this.form.value;

    this.pending.next(true);
    this.authService.signIn(formValue.email, formValue.password)
      .pipe(finalize(() => this.pending.next(false)))
      .subscribe(
        null,
        (err: firebase.FirebaseError) => this.setFormErrors(err),
      );
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
    });
  }

  private setFormErrors(err: firebase.FirebaseError) {
    this.form.setErrors({ auth: err });
  }

}
