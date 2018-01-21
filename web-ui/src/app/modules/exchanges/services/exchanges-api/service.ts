import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'app/modules/shared/app-config.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { AvailableExchange } from '../../models/available-exchange.model';
import { ExchangeWallet } from '../../models/exchange-wallet.model';
import { Exchange } from '../../models/exchange.model';

export interface SupportedExchangesTO {
  status: string;
  results: string[];
}

export interface GetWalletPayload {
  exchangeName: string;
  exchangeKey: string;
  exchangeSecret: string;
  exchangePass?: string;
}

@Injectable()
export class ExchangesApiService {

  /**
   * Creates an instance of exchangesApiService.
   */
  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
  ) { }

  /**
   * Retrieve available exchanges.
   */
  public getSupportedExchanges(): Observable<AvailableExchange[]> {
    return this.http.get<SupportedExchangesTO>(`${this.appConfig.apiUri}/supportedExchanges`)
      .pipe(map((res) => res.results.map((key) => ({ exchangeName: key }))));
  }

  /**
   * Retrieves the stored exchanges with their configuration.
   */
  public getStoredExchanges(): Observable<Exchange[]> {
    console.warn('TBI');
    return of([ ]);
  }

  public checkCredentials(args: Exchange): Observable<Exchange> {
    const params = new HttpParams({ fromObject: args as any });

    // @TODO currently abusing getWallet request for checking credentials
    return this.http.get<ExchangeWallet>(
      `${this.appConfig.apiUri}/exchangeWallets`,
      { params },
    ).pipe(map(() => args));
  }

  /**
   * Retrieve the wallet balance from an exchange using the given credentials.
   */
  public getWallet(args: GetWalletPayload): Observable<ExchangeWallet> {
    const params = new HttpParams({ fromObject: args as any });

    return this.http.get<ExchangeWallet>(
      `${this.appConfig.apiUri}/exchangeWallets`,
      { params },
    ).pipe(
      // add the exchange name the the loaded wallet
      map((wallet) => { wallet.exchangeName = args.exchangeName; return wallet; }),
    );
  }

}
