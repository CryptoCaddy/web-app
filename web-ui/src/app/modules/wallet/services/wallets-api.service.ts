import { Injectable } from '@angular/core';
import { AbstractApiService } from 'app/modules/shared/services/abstract-api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ExchangesProvider } from '../../exchanges/storages/exchanges.provider';
import { Wallet } from '../models/wallet.model';

@Injectable()
export class WalletsApiService extends AbstractApiService<Wallet> {

  constructor(private exchangeProvider: ExchangesProvider) {
    super();
  }

  public list(): Observable<Wallet[]> {

    // @TODO include regular wallets

    // Include the exchange wallets
    const exchangeWallets$ = this.exchangeProvider.data$.pipe(
      map((exchanges): Wallet[] => exchanges.map((exchange) => {
        return <Wallet>{
          walletId: exchange.exchangeId,
          walletName: exchange.exchangeName,
          coins: exchange.exchangeCoins,
        };
      })),
    );

    return exchangeWallets$;
  }

  public add(item: Partial<Wallet>): Observable<Wallet> {
    throw new Error('Method not allowed.');
  }

  public update(item: Wallet): Observable<Wallet> {
    throw new Error('Method not allowed.');
  }

  public drop(item: Wallet): Observable<boolean> {
    throw new Error('Method not allowed.');
  }

}
