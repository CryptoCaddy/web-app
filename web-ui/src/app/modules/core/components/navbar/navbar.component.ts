import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthUser } from 'app/modules/auth/models/auth-user.model';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cdy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
})
export class NavbarComponent implements OnInit {

  public loggedIn$: Observable<boolean>;
  public user$: Observable<AuthUser>;

  // @HostBinding('class.hidden')
  // private hidden: boolean;

  constructor(private auth: AuthService) { }

  public ngOnInit() {
    this.loggedIn$ = this.auth.loggedIn$;
    this.user$ = this.auth.user$;

    // this.loggedIn$.subscribe((loggedIn) => this.hidden = !loggedIn);
  }

  public onLogout() {
    this.auth.signOut();
  }

}
