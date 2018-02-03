import { Component } from '@angular/core';
import { AuthService } from 'app/modules/auth/services/auth.service';

@Component({
  selector: 'cdy-account-login-page',
  templateUrl: './account-login.page.html',
  styleUrls: [ './account-login.page.scss' ],
})
export class AccountLoginPage {

  constructor(private auth: AuthService) { }

  public anonymousLogin() {
    this.auth.signInAnonymously();
    // this.auth.registrationFinished();
  }

}
