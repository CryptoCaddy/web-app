import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'app/modules/shared/services/app-config.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';

import { AbstractApiService } from '../../shared/services/abstract-api.service';
import { Exchange } from '../models/exchange.model';

export interface GetWalletPayload {
  exchangeName: string;
  exchangeKey: string;
  exchangeSecret: string;
  exchangePass?: string;
}

@Injectable()
export class ExchangesApiService extends AbstractApiService<Exchange> {

  /**
   * Creates an instance of exchangesApiService.
   */
  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
  ) {
    super();
  }

  public list(): Observable<Exchange[]> {
    console.warn('TBI');
    return of([ ]);
  }

  public add(exchange: Partial<Exchange>): Observable<Exchange> {
    return this.http.post(
      `${this.appConfig.apiUri}/addExchange`,
      exchange,
    ).pipe(map((response: Partial<Exchange>) => (<Exchange>{
      // @TODO mock: use the api key as identifier
      exchangeId: exchange.parameters[ 'api key' ],
      ...exchange,
      ...response,
    })));
  }

  /** remove stored exchange. */
  public drop(exchange: Exchange): Observable<boolean> {
    // @TODO real request - for now only delay for demonstration
    return of(true).pipe(delay(500));
  }

  // @TODO
  public update(exchange: Exchange) {
    // const params = new HttpParams({ fromObject: exchange as any });
    // @TODO real request - for now only delay for demonstration
    return of(exchange).pipe(delay(1000));
  }

}
