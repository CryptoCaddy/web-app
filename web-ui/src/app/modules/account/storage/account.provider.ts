import { Injectable } from '@angular/core';
import { AbstractProvider } from 'app/modules/shared/storage/abstract.provider';

import { Account, isAccount } from '../models/account.model';
import { AccountApiService } from '../services/account-api.service';

@Injectable()
export class AccountProvider extends AbstractProvider<Account> {

  protected idProperty = 'email';

  constructor(private accountApi: AccountApiService) {
    super(accountApi, localStorage, isAccount);
    this.init();
  }

}
