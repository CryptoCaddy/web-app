import { Injectable } from '@angular/core';

import { ExchangesApiService } from '../../services/exchanges-api/service';
import { SupportedExchangesDatabase } from '../supported-exchanges/database';

@Injectable()
export class SupportedExchangesProvider {

  private database: SupportedExchangesDatabase;

  constructor(private exchangesApi: ExchangesApiService) { }

  public get(): SupportedExchangesDatabase {
    if (this.database) {
      return this.database;
    }

    this.database = new SupportedExchangesDatabase(this.exchangesApi);
    this.database.init();
    return this.database;
  }

}
