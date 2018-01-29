import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { trackTypeBy } from 'app/modules/shared/utils/array.util';
import { Observable } from 'rxjs/Observable';

import { ExchangesDataSource } from '../../data-sources/exchanges.data-source';
import { Exchange } from '../../models/exchange.model';

@Component({
  selector: 'cdy-exchange-wallet-list',
  templateUrl: './exchange-wallet-list.component.html',
  styleUrls: [ './exchange-wallet-list.component.scss' ],
})
export class ExchangeWalletListComponent implements OnInit, OnDestroy {

  @Input()
  public dataSource: ExchangesDataSource;

  public exchanges$: Observable<Exchange[]>;

  public trackExchangeBy = trackTypeBy<Exchange>();

  constructor() { }

  ngOnInit() {
    this.exchanges$ = this.dataSource.connect();
  }

  ngOnDestroy() {
    this.dataSource.disconnect();
  }

}
