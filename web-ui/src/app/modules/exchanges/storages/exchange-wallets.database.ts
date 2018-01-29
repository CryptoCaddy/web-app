import { Logger } from 'app/modules/shared/utils/logger.util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { ExchangeWallet } from '../models/exchange-wallet.model';
import { ExchangesApiService } from '../services/exchanges-api.service';

/**
 * Database for storing exchange wallets.
 */
export class ExchangeWalletsDatabase  {

  /** Subject that broadcasts to the {@link data$} stream. */
  private _data$: BehaviorSubject<ExchangeWallet[]> = new BehaviorSubject([ ]);

  /** Subject that emits when the data in the database changes. */
  public data$ = this._data$.asObservable();

  constructor(
    private exchangeWalletApi: ExchangesApiService,
  ) { }

  public loadWallet(exchangeName: string, exchangeKey: string, exchangeSecret: string, exchangePass: string): Observable<ExchangeWallet> {
    return this.exchangeWalletApi.getWallet({ exchangeName, exchangeKey, exchangeSecret, exchangePass })
      .pipe(tap((wallet) => this.add(exchangeName, wallet)));
  }

  get data(): ExchangeWallet[] {
    return this._data$.value;
  }

  /** adds a wallet to the local database - this information is not stored on the server side */
  private add(exchangeName: string, wallet: ExchangeWallet): void {
    const data = [
      ...this.data,
      wallet,
    ];
    Logger.logGroup(this.constructor.name, 'add', data);
    this._data$.next(data);
  }

}
