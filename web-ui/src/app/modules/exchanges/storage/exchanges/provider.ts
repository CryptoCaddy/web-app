import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Exchange } from '../../models/exchange.model';
import { ExchangesApiService } from '../../services/exchanges-api/service';
import { ExchangesDatabase } from '../exchanges/database';

@Injectable()
export class ExchangesProvider {

  private database: ExchangesDatabase;

  constructor(private exchangesApi: ExchangesApiService) { }

  public get(): ExchangesDatabase {
    if (this.database) {
      return this.database;
    }

    this.database = new ExchangesDatabase(this.exchangesApi);
    this.database.init();
    return this.database;
  }

  public save(exchange: Exchange): Observable<Exchange> {
    const existingIndex = this.database.data.findIndex((e) => e.exchangeName === exchange.exchangeName);
    return existingIndex === -1 ? this.add(exchange) : this.update(exchange);
  }

  public remove(exchange: Exchange): Observable<Exchange> {
    return this.database.drop(exchange);
  }

  private add(exchange: Exchange): Observable<Exchange> {
    return this.database.add(exchange);
  }

  private update(exchange: Exchange): Observable<Exchange> {
    return this.database.update(exchange);
  }

}
