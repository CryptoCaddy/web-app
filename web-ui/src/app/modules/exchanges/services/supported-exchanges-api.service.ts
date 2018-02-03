import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiService } from 'app/modules/shared/services/abstract-api.service';
import { AppConfigService } from 'app/modules/shared/services/app-config.service';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { map } from 'rxjs/operators';

import { SupportedExchange, SupportedExchangeParameter } from '../models/supported-exchange.model';

interface SupportedExchangeTO {
  parameterList: SupportedExchangeParameter[];
}

interface SupportedExchangesTO {
   exchangeToParameterMap: {
    [key: string]: SupportedExchangeTO;
   };
}


@Injectable()
export class SupportedExchangesApiService extends AbstractApiService<SupportedExchange> {

  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
  ) {
    super();
  }

  public list(): Observable<SupportedExchange[]> {
    return this.http.get<SupportedExchangesTO>(`${this.appConfig.apiUri}/supportedExchanges`)
      .pipe(
        map((data) => Object.entries(data.exchangeToParameterMap)),
        map((entries) => entries.map(([ key, exchangeTO ]) => ({
          exchangeName: key,
          parameterList: exchangeTO.parameterList,
        }))),
      );
  }

  public add(item: SupportedExchange): Observable<SupportedExchange> {
    return _throw('Method not allowed.');
  }

  public update(item: SupportedExchange): Observable<SupportedExchange> {
    return _throw('Method not allowed.');
  }

  public drop(item: SupportedExchange): Observable<boolean> {
    return _throw('Method not allowed.');
  }

}
