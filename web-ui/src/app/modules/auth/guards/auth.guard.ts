import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Logger } from 'app/modules/shared/utils/logger.util';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(): Observable<boolean> {
    return this.authService.loggedIn$
      .pipe(
        map((user) => user != null),
        tap((allowed: boolean) => !allowed ? this.reroute() : null),
      );
  }

  private reroute() {
    const target = '/account/login';
    Logger.logGroup(this.constructor.name, 'reroute', target, 'info');
    this.router.navigateByUrl(target);
  }

}
