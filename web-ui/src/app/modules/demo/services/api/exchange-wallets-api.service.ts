import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ExchangeWallet } from '../../models/exchange-wallet.model';
import { AppConfigService } from 'app/modules/shared/app-config.service';

export interface ExchangeWalletGetRequest {
  exchangeName: string;
  exchangeKey: string;
  exchangeSecret: string;
  exchangePass?: string;
}

@Injectable()
export class ExchangeWalletsApiService {

  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
  ) { }

  public get(
    exchangeName: string, exchangeKey: string, exchangeSecret: string, exchangePass?: string,
  ): Observable<ExchangeWallet> {
    const params = new HttpParams({ fromObject: { exchangeName, exchangeKey, exchangeSecret, exchangePass } });

    return this.http.get<ExchangeWallet>(
      `${this.appConfig.apiUri}/exchangeWallets`,
      { params })
    ;
  }

}
