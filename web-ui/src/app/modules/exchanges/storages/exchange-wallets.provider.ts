import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ExchangeWallet } from '../models/exchange-wallet.model';
import { ExchangesApiService } from '../services/exchanges-api.service';
import { ExchangeWalletsDatabase } from '../storages/exchange-wallets.database';

@Injectable()
export class ExchangeWalletsProvider {

  private database: ExchangeWalletsDatabase;

  constructor(private exchangesApi: ExchangesApiService) { }

  public get(): ExchangeWalletsDatabase {
    if (!this.database) {
      this.database = new ExchangeWalletsDatabase(this.exchangesApi);
    }

    return this.database;
  }

  /** initialize a specific database record, since ExchangeWallets is a virtual database */
  public loadWallet(exchange: string, apiKey: string, apiSecret: string, password?: string): Observable<ExchangeWallet> {
    const existingWallet = this.database.data.find((wallet) => wallet.exchangeName === exchange);
    if (existingWallet) {
      return of(existingWallet);
    }

    return this.database.loadWallet(exchange, apiKey, apiSecret, password);
  }

}
