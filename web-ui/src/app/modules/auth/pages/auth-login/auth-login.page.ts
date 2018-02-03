import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cdy-login',
  templateUrl: './auth-login.page.html',
  styleUrls: [ './auth-login.page.scss' ],
})
export class AuthLoginPage {

  constructor(private auth: AuthService) { }

  public anonymousLogin() {
    this.auth.signInAnonymously();
    // this.auth.registrationFinished();
  }

}
