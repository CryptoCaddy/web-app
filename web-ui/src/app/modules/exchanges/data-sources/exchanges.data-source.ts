import { DataSource } from '@angular/cdk/table';
import { ArrayUtil } from 'app/modules/shared/utils/array.util';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { Exchange } from '../models/exchange.model';
import { ExchangesProvider } from '../storages/exchanges.provider';

export class ExchangesDataSource extends DataSource<Exchange> {

  constructor(private exchangesProvider: ExchangesProvider) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  public connect(): Observable<Exchange[]> {
    const sources$ = combineLatest(
      this.exchangesProvider.data$,
    );

    const stream$ = sources$.pipe(
      map(([ exchanges ]) => ArrayUtil.sortByKey(exchanges, 'exchangeName')),
    );

    return stream$;
  }

  public disconnect() { }

}
