import { Component, OnInit } from '@angular/core';

import { ExchangesDataSource } from '../../data-sources/exchanges.data-source';
import { ExchangesProvider } from '../../storages/exchanges.provider';
import { SupportedExchangesProvider } from '../../storages/supported-exchanges.provider';

@Component({
  selector: 'cdy-exchanges-page',
  templateUrl: './exchanges.page.html',
  styleUrls: [ './exchanges.page.scss' ],
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
