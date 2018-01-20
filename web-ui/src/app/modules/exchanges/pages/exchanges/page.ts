import { Component, OnInit } from '@angular/core';

import { ExchangesDataSource } from '../../data-sources/exchanges/data-source';
import { AvailableExchangesProvider } from '../../storage/available-exchanges/provider';
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
    private availableExchangesData: AvailableExchangesProvider,
    private exchangesData: ExchangesProvider,
  ) { }

  ngOnInit() {
    const availableExchangesDb = this.availableExchangesData.get();
    const exchangesDb = this.exchangesData.get();
    this.configurationDataSource = new ExchangesDataSource(availableExchangesDb, exchangesDb);
    this.walletDataSource = new ExchangesDataSource(availableExchangesDb, exchangesDb);
    this.walletDataSource.enabledOnly = true;
  }

}
