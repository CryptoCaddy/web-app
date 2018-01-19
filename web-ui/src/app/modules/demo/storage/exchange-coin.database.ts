import { ApiError } from 'app/modules/shared/models/api-error.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';

import { ExchangeCoin } from '../models/exchange-coin.model';
import { ExchangeWallet } from '../models/exchange-wallet.model';
import { ExchangeWalletsApiService } from '../services/api/exchange-wallets-api.service';

export class ExchangeCoinDatabase {

  /** Stream that emits whenever the data has been modified. */
  public dataChange: BehaviorSubject<ExchangeCoin[]> = new BehaviorSubject<ExchangeCoin[]>([ ]);

  /** Stream that emits whenever the data is loading. */
  public loadingChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public errorChange: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);

  constructor(
    private exchangeWalletApi: ExchangeWalletsApiService,
  ) { }

  public init(exchange: string, apiKey: string, apiSecret: string, password: string) {
    this.loadingChange.next(true);
    this.exchangeWalletApi.get(exchange, apiKey, apiSecret, password)
      .pipe(
        map((wallet: ExchangeWallet) => wallet.coins),
      )
      .subscribe(
        (data: ExchangeCoin[]) => {
          this.errorChange.next(null);
          this.dataChange.next(data.slice());
          this.loadingChange.next(false);
        },

        (res: { error: ApiError }) => {
          this.errorChange.next((res.error).message);
          this.loadingChange.next(false);
        },
      );
  }

  get data(): ExchangeCoin[] {
    return this.dataChange.value;
  }

}
