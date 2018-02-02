import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ArrayUtil } from 'app/modules/shared/utils/array.util';
import { take } from 'rxjs/operators';

import { ExchangesDataSource } from '../../data-sources/exchanges.data-source';
import { Exchange } from '../../models/exchange.model';
import { ExchangesProvider } from '../../storages/exchanges.provider';
import { AddExchangeDialogComponent } from '../add-exchange-dialog/add-exchange-dialog.component';

enum EDisplayedColumns {
  EXCHANGE_NAME = 'exchangeName',
  EXCHANGE_KEY = 'exchangeKey',
  ACTION_DROP = 'actionDrop',
}

@Component({
  selector: 'cdy-exchanges-setup-table',
  templateUrl: './exchanges-setup-table.component.html',
  styleUrls: [ './exchanges-setup-table.component.scss' ],
})
export class ExchangesSetupTableComponent implements OnInit {

  public dataSource: ExchangesDataSource;

  // @TODO
  public loading = false;

  public trackExchangeBy = ArrayUtil.trackTypeBy<Exchange>();

  public displayedColumns: EDisplayedColumns[] = [
    EDisplayedColumns.EXCHANGE_NAME,
    EDisplayedColumns.EXCHANGE_KEY,
    EDisplayedColumns.ACTION_DROP,
  ];

  constructor(
    private dialog: MatDialog,
    private exchangesProvider: ExchangesProvider,
  ) { }

  public ngOnInit() {
    this.dataSource = new ExchangesDataSource(this.exchangesProvider);
  }

  public getColumnValue(row: Exchange, key: EDisplayedColumns) {
    switch (key) {
      case EDisplayedColumns.EXCHANGE_NAME:
        return `${row.exchangeName}`;

      case EDisplayedColumns.EXCHANGE_KEY:
        return `${row.parameters['api key']}`;

      default:
        console.error(`${this.constructor.name}#getColumnValue`, `Unexpected column "${key}".`);
        return '';
    }
  }

  public addExchange() {
    this.dialog.open(AddExchangeDialogComponent, {
      width: '24rem',
    });
  }

  public dropExchange(exchange: Exchange) {
    this.exchangesProvider.drop(exchange)
      .pipe(take(1))
      .subscribe();
  }

}
