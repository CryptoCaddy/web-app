import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, tap } from 'rxjs/operators';

import { WalletCoin } from '../models/wallet-coin.model';
import { Wallet } from '../models/wallet.model';
import { Logger } from '../../shared/utils/logger.util';

export class WalletCoinsDataSource extends DataSource<WalletCoin> {

  constructor(private wallets$: Observable<Wallet[]>) {
    super();
  }

  public connect(): Observable<WalletCoin[]> {
    const sources$ = combineLatest(
        this.wallets$,
    );

    return sources$.pipe(
      map(([ wallets ]) => WalletCoin.fromWallet(wallets)),
      tap((walletCoins) => Logger.logGroup(this.constructor.name, 'changed', walletCoins)),
    );
  }

  public disconnect(): void { }

}
