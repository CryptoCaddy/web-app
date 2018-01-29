import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

@Injectable()
export class AccountService {

  constructor() { }

  /**
   * Updates the user account.
   * @TODO
   */
  public updateAccount(): Observable<void> {
    return of(null).pipe(delay(1000));
  }

}
