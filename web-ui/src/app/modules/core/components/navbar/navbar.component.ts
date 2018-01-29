import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'app/modules/auth/models/auth-user.model';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cdy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
})
export class NavbarComponent implements OnInit {

  public user$: Observable<AuthUser>;

  constructor(private authService: AuthService) {
  }

  public ngOnInit() {
    this.user$ = this.authService.user$;
  }

  public onLogout() {
    this.authService.signOut();
  }

}
