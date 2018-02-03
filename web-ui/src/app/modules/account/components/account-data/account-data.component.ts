import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { AuthUser } from 'app/modules/auth/models/auth-user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getErrorMessage } from 'app/modules/shared/utils/form.util';

@Component({
  selector: 'cdy-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: [ './account-data.component.scss' ],
})
export class AccountDataComponent implements OnInit {

  public form: FormGroup;

  private user: AuthUser;

  public getErrorMessage = getErrorMessage;

  constructor(private auth: AuthService) { }

  public ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.updateUser(user);
    });

    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl(
        { value: this.user && this.user.email, disabled: true },
        [ Validators.required ],
      ),
    });
  }

  private updateUser(user: AuthUser): void {
    this.user = user;

    if (this.form) {
      this.form.get('email').setValue(user ? user.email : null);
    }
  }

}
