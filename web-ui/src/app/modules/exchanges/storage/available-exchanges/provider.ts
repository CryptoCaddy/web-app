import { Injectable } from '@angular/core';

import { ExchangesApiService } from '../../services/exchanges-api/service';
import { AvailableExchangesDatabase } from '../available-exchanges/database';

@Injectable()
export class AvailableExchangesProvider {

  private database: AvailableExchangesDatabase;

  constructor(private exchangesApi: ExchangesApiService) { }

  public get(): AvailableExchangesDatabase {
    if (this.database) {
      return this.database;
    }

    this.database = new AvailableExchangesDatabase(this.exchangesApi);
    this.database.init();
    return this.database;
  }

}
