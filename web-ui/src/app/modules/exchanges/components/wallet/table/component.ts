import { Component, Input } from '@angular/core';
import { trackTypeBy } from 'app/modules/shared/utils/array.util';

import { ExchangeCoinsDataSource } from '../../../data-sources/exchange-coins/data-source';
import { ExchangeCoin } from '../../../models/exchange-coin.model';

enum EDisplayedColumns {
  NAME = 'name',
  AVAILABLE = 'available',
  DEPOSITING = 'depositing',
  WITHDRAWING = 'withdrawing',
  TOTAL = 'total',
}

@Component({
  selector: 'cdy-exchange-wallet-table',
  templateUrl: './component.html',
  styleUrls: [ './component.scss' ],
})
export class ExchangeWalletTableComponent {

  @Input()
  public dataSource: ExchangeCoinsDataSource;

  @Input()
  loading: boolean;

  public trackCoinsBy = trackTypeBy<ExchangeCoin>();

  public displayedColumns: EDisplayedColumns[] = [
    EDisplayedColumns.NAME,
    EDisplayedColumns.AVAILABLE,
    EDisplayedColumns.DEPOSITING,
    EDisplayedColumns.WITHDRAWING,
    EDisplayedColumns.TOTAL,
  ];

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
        console.error(this.constructor.name, `Unexpected column "${key}".`);
        return '';
    }
  }

}
