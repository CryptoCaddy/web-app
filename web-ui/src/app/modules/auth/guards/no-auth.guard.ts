import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Logger } from 'app/modules/shared/utils/logger.util';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(): Observable<boolean> {
    return this.authService.loggedIn$
      .pipe(map((loggedIn) => !loggedIn));
  }

}
