import { Component, OnInit } from '@angular/core';

import { ExchangesDataSource } from '../../data-sources/exchanges/data-source';
import { SupportedExchangesProvider } from '../../storage/supported-exchanges/provider';
import { ExchangesProvider } from '../../storage/exchanges/provider';

@Component({
  selector: 'cdy-exchanges-page',
  templateUrl: './page.html',
  styleUrls: [ './page.scss' ],
})
export class ExchangesPage implements OnInit {

  public configurationDataSource: ExchangesDataSource;
  public walletDataSource: ExchangesDataSource;

  constructor(
    private supportedExchangesData: SupportedExchangesProvider,
    private exchangesData: ExchangesProvider,
  ) { }

  ngOnInit() {
    const supportedExchangesDb = this.supportedExchangesData.get();
    const exchangesDb = this.exchangesData.get();
    this.configurationDataSource = new ExchangesDataSource(supportedExchangesDb, exchangesDb);
    this.walletDataSource = new ExchangesDataSource(supportedExchangesDb, exchangesDb);
    this.walletDataSource.enabledOnly = true;
  }

}
