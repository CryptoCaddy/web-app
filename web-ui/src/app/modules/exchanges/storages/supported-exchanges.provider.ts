import { Injectable } from '@angular/core';
import { AbstractProvider } from 'app/modules/shared/storage/abstract.provider';

import { isSupportedExchange, SupportedExchange } from '../models/supported-exchange.model';
import { SupportedExchangesApiService } from '../services/supported-exchanges-api.service';

@Injectable()
export class SupportedExchangesProvider extends AbstractProvider<SupportedExchange> {

  protected idProperty = 'exchangeName';

  constructor(supportedExchangesApi: SupportedExchangesApiService) {
    super(supportedExchangesApi, sessionStorage, isSupportedExchange);
    this.init();
  }

}
