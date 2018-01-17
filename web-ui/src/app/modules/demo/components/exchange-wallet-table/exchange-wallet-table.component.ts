import { Component, OnInit } from '@angular/core';
import { trackTypeBy } from 'app/utils/array.util';

import { ExchangeCoin } from '../../models/exchange-coin.model';
import { ExchangeWalletService } from '../../services/exchange-wallet.service';
import { ExchangeCoinDataSource } from '../../storage/exchange-coin.datas-source';

enum EDisplayedColumns {
  NAME = 'name',
  AVAILABLE = 'available',
  DEPOSITING = 'depositing',
  WITHDRAWING = 'withdrawing',
  TOTAL = 'total',
}

@Component({
  selector: 'cdy-exchange-wallet-table',
  templateUrl: './exchange-wallet-table.component.html',
  styleUrls: [ './exchange-wallet-table.component.scss' ],
})
export class ExchangeWalletTableComponent implements OnInit {

  public loading: boolean = false;

  public dataSource: ExchangeCoinDataSource;

  public trackCoinsBy = trackTypeBy<ExchangeCoin>();

  public displayedColumns: EDisplayedColumns[] = [
    EDisplayedColumns.NAME,
    EDisplayedColumns.AVAILABLE,
    EDisplayedColumns.DEPOSITING,
    EDisplayedColumns.WITHDRAWING,
    EDisplayedColumns.TOTAL,
  ];

  private availableColumns: (keyof ExchangeCoin)[] = [
    'available',
    'availableForWithdrawal',
    'currencyCode',
    'depositing',
    'displayName',
    'symbol',
    'totalQuantity',
    'withdrawing',
  ];

  constructor(
    private exchangeWalletService: ExchangeWalletService,
  ) { }

  ngOnInit() {
    this.exchangeWalletService.database.loadingChange
      .subscribe((loading: boolean) => this.loading = loading);

    this.dataSource = new ExchangeCoinDataSource(this.exchangeWalletService.database);
  }

  public getColumnValue(row: ExchangeCoin, key: EDisplayedColumns) {
    switch (key) {
      case EDisplayedColumns.AVAILABLE:
        return `${row.available.toFixed(8)}`;

      case EDisplayedColumns.DEPOSITING:
        return `${row.depositing.toFixed(8)}`;

      case EDisplayedColumns.NAME:
        return `${row.displayName} (${row.currencyCode})`;

      case EDisplayedColumns.TOTAL:
        return `${row.totalQuantity.toFixed(8)}`;

      case EDisplayedColumns.WITHDRAWING:
        return `${row.withdrawing.toFixed(8)}`;

      default:
        console.error(`Unexpected column "${key}".`);
        return '';
    }
  }

}
