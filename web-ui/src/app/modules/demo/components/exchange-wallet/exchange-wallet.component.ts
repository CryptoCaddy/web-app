import { Component } from '@angular/core';

import { ExchangeWalletsApiService } from '../../services/api/exchange-wallets-api.service';
import { ExchangeWalletService } from '../../services/exchange-wallet.service';

@Component({
  selector: 'cdy-exchange-wallet',
  templateUrl: './exchange-wallet.component.html',
  styleUrls: [ './exchange-wallet.component.scss' ],
  providers: [
    ExchangeWalletsApiService,
    ExchangeWalletService,
  ],
})
export class ExchangeWalletComponent { }
