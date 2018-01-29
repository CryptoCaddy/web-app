import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { ExchangeWallet } from '../models/exchange-wallet.model';
import { ExchangeWalletsDatabase } from '../storages/exchange-wallets.database';

export class ExchangeWalletsDataSource extends DataSource<ExchangeWallet> {

  private _exchangeName = new BehaviorSubject<string|null>(null);
  public get exchangeName(): string|null { return this._exchangeName.value; }
  public set exchangeName(v: string|null) { this._exchangeName.next(v); }

  constructor(private database: ExchangeWalletsDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ExchangeWallet[]> {
    const sources$ = merge(
      this.database.data$,
      this._exchangeName,
    );

    return sources$.pipe(
      // filter by exchange name
      map(() => this.database.data.filter((wallet) => wallet.exchangeName === this.exchangeName)),
    );
  }

  disconnect() { }

}
