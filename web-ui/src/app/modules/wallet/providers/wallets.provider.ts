import { Injectable } from '@angular/core';

import { AbstractProvider } from '../../shared/storage/abstract.provider';
import { Wallet, isWallet } from '../models/wallet.model';
import { WalletsApiService } from '../services/wallets-api.service';

@Injectable()
export class WalletsProvider extends AbstractProvider<Wallet> {

  public idProperty = 'walletName';

  constructor(walletApi: WalletsApiService) {
    super(walletApi, sessionStorage, isWallet);
    this.init();
  }

}
