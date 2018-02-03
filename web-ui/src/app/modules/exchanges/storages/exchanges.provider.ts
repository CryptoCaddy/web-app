import { Injectable } from '@angular/core';
import { AbstractProvider } from 'app/modules/shared/storage/abstract.provider';

import { Exchange, isExchange } from '../models/exchange.model';
import { ExchangesApiService } from '../services/exchanges-api.service';

@Injectable()
export class ExchangesProvider extends AbstractProvider<Exchange> {

  protected idProperty = 'exchangeId';

  constructor(exchangesApi: ExchangesApiService) {
    super(exchangesApi, sessionStorage, isExchange);
    this.init();
  }

}
