import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { ExchangeCoin } from '../models/exchange-coin.model';
import { ExchangeWalletsDataSource } from './exchange-wallets.data-source';

export class ExchangeCoinsDataSource extends DataSource<ExchangeCoin> {

  private coins$: Observable<ExchangeCoin[]>;

  constructor(walletDataSource: ExchangeWalletsDataSource) {
    super();

    this.coins$ = walletDataSource.connect()
      .pipe(map((wallets) => wallets.length ? wallets[0].coins : [ ]));
  }

  connect(): Observable<ExchangeCoin[]> {
    const sources$ = merge(
      this.coins$,
    );

    return sources$;
  }

  disconnect() { }

}
