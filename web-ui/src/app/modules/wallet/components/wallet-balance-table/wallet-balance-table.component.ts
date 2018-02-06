import { Component, Input, OnInit } from '@angular/core';

import { WalletCoinsDataSource } from '../../data-sources/wallet-coins.data-source';
import { Wallet } from '../../models/wallet.model';
import { WalletCoin } from '../../models/wallet-coin.model';
import { ArrayUtil } from '../../../shared/utils/array.util';

export enum WalletBalanceTableColumns {
  WALLET_NAME = 'walletName',
  COIN_NAME = 'coinName',
  COIN_BALANCE = 'coinBalance',
}

@Component({
  selector: 'cdy-wallet-balance-table',
  templateUrl: './wallet-balance-table.component.html',
  styleUrls: [ './wallet-balance-table.component.scss' ],
})
export class WalletBalanceTableComponent {

  public trackWalletCoinBy = ArrayUtil.trackTypeBy<WalletCoin>();

  @Input()
  public dataSource: WalletCoinsDataSource;

  @Input()
  public displayedColumns: WalletBalanceTableColumns[] = [
    WalletBalanceTableColumns.WALLET_NAME,
    WalletBalanceTableColumns.COIN_NAME,
    WalletBalanceTableColumns.COIN_BALANCE,
  ];

  constructor() { }

  public getColumnContent(row: WalletCoin, col: WalletBalanceTableColumns): string {
    if (!row) { return; }
    switch (col) {
      case WalletBalanceTableColumns.WALLET_NAME:
        return row.walletName;

      case WalletBalanceTableColumns.COIN_BALANCE:
        return row.coinBalance.toFixed(8);

      case WalletBalanceTableColumns.COIN_NAME:
        return row.coinName;
    }
  }

}
