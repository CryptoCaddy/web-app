import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';

import { Account } from '../models/account.model';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AccountApiService {

  constructor(private auth: AuthService) { }

  /** @TODO */
  public list(): Observable<Account[]> {
    // @TODO remove `AuthService` injection when replacing mock.
    // Mock data is not persisted but overwritten with firebase data on each page reload.
    return this.auth.user$.pipe(
      map((user) => [ { email: user.email } ]),
      delay(500),
    );
  }

  /** @TODO */
  public add(account: Account): Observable<Account> {
    return of(account).pipe(
      delay(500),
    );
  }

  /** @TODO */
  public update(account: Account): Observable<Account> {
    return of(account).pipe(
      delay(500),
    );
  }

  /** @TODO */
  public drop(account: Account): Observable<boolean> {
    return of(true).pipe(
      delay(500),
    );
  }

}
