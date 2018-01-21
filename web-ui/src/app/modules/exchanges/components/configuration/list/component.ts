import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { trackTypeBy } from 'app/modules/shared/utils/array.util';
import { Observable } from 'rxjs/Observable';

import { ExchangesDataSource } from '../../../data-sources/exchanges/data-source';
import { Exchange } from '../../../models/exchange.model';

@Component({
  selector: 'cdy-exchange-configuration-list',
  templateUrl: './component.html',
  styleUrls: [ './component.scss' ],
})
export class ExchangesConfigurationListComponent implements OnInit, OnDestroy {

  public trackExchangeBy = trackTypeBy<Exchange>();

  @Input()
  public dataSource: ExchangesDataSource;
  public exchanges$: Observable<Exchange[]>;

  /** exchangeName of the panel that is opened */
  public opened: string|null = null;

  constructor() { }

  public ngOnInit() {
    if (this.dataSource) {
      this.exchanges$ = this.dataSource.connect();
    }
  }

  public ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  /** set {@link opened} panel */
  public setOpened(v: string) {
    this.opened = v;
  }

  /** close all panels by resetting {@link opened} */
  public onExchangeSubmit(exchange: Exchange) {
    this.opened = null;
  }

}
