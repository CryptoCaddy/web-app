import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  public canActivate(): Observable<boolean> {
    return this.authService.loggedIn$
      .pipe(map((loggedIn) => !loggedIn));
  }

}
