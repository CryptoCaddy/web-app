import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { getHttpErrorMessage } from 'app/modules/shared/utils/http.util';
import { finalize, tap } from 'rxjs/operators';

import { ExchangeCoinsDataSource } from '../../data-sources/exchange-coins.data-source';
import { ExchangeWalletsDataSource } from '../../data-sources/exchange-wallets.data-source';
import { Exchange } from '../../models/exchange.model';
import { ExchangeWalletsDatabase } from '../../storages/exchange-wallets.database';
import { ExchangeWalletsProvider } from '../../storages/exchange-wallets.provider';

@Component({
  selector: 'cdy-exchange-wallet',
  templateUrl: './exchange-wallet.component.html',
  styleUrls: [ './exchange-wallet.component.scss' ],
  providers: [
    ExchangeWalletsProvider,
  ],
})
export class ExchangeWalletComponent implements OnInit {

  @Input()
  public exchange: Exchange;

  public dataSource: ExchangeCoinsDataSource;

  public loading: boolean = false;

  public errorMsg: string|null = null;

  private database: ExchangeWalletsDatabase;
  private walletsDataSource: ExchangeWalletsDataSource;

  constructor(private exchangeWalletsData: ExchangeWalletsProvider) { }

  ngOnInit() {
    this.loading = true;
    const { exchangeName, exchangeKey, exchangeSecret, exchangePass } = this.exchange;
    this.database = this.exchangeWalletsData.get();
    this.exchangeWalletsData.loadWallet(exchangeName, exchangeKey, exchangeSecret, exchangePass)
      .pipe(tap(() => this.errorMsg = null))
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (wallet) => {
          this.walletsDataSource = new ExchangeWalletsDataSource(this.database);
          this.walletsDataSource.exchangeName = this.exchange.exchangeName;

          this.dataSource = new ExchangeCoinsDataSource(this.walletsDataSource);
        },
        this.setError.bind(this),
      );
  }

  private setError(err: HttpErrorResponse): void {

    // @TODO use friendly messages instead of api error messages
    // @TODO distinct messages for specific error codes
    this.errorMsg = getHttpErrorMessage(err);

  }

}
