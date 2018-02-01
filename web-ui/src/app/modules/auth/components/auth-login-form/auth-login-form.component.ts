import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'app/modules/shared/components/base-form/base-form.component';
import { finalize } from 'rxjs/operators';

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
export class AuthLoginFormComponent extends BaseFormComponent {

  /**
   * Creates an instance of LoginComponent.
   */
  constructor(private authService: AuthService) {
    super();
  }

  /** @memberof BaseFormComponent */
  public submit(): void {
    if (!this.canSubmit()) {
      return;
    }

    const formValue = this.form.value;

    this.pending.next(true);
    this.authService.signIn(formValue.email, formValue.password)
      .pipe(finalize(() => this.pending.next(false)))
      .subscribe(
        null,
        (err: firebase.FirebaseError) => this.setFormErrors(err),
      );
  }

  /** @memberof BaseFormComponent */
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
