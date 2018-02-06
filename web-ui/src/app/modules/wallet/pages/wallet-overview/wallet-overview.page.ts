import { WalletCoinsDataSource } from '../../data-sources/wallet-coins.data-source';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Wallet } from '../../models/wallet.model';
import { WalletsProvider } from '../../providers/wallets.provider';

@Component({
  selector: 'cdy-wallet-overview',
  templateUrl: './wallet-overview.page.html',
  styleUrls: [ './wallet-overview.page.scss' ],
})
export class WalletOverviewPage implements OnInit {

  public dataSource: WalletCoinsDataSource;

  constructor(private walletsProvider: WalletsProvider) { }

  ngOnInit() {
    this.dataSource = new WalletCoinsDataSource(this.walletsProvider.data$);
  }

}
