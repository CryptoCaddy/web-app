import { Injectable } from '@angular/core';

import { ExchangeCoinDatabase } from '../storage/exchange-coin.database';
import { ExchangeWalletsApiService } from './api/exchange-wallets-api.service';

@Injectable()
export class ExchangeWalletService {

  public get database(): ExchangeCoinDatabase {
    return this._database;
  }

  private _database: ExchangeCoinDatabase;

  constructor(
    private exchangeWalletApi: ExchangeWalletsApiService,
  ) {
    this._database = new ExchangeCoinDatabase(this.exchangeWalletApi);
  }

  public initialize(exchange: string, apiKey: string, apiSecret: string, password?: string) {
    this._database.init(exchange, apiKey, apiSecret, password);
  }

}
