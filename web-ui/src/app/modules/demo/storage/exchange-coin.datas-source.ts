import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';

import { ExchangeCoinDatabase } from './exchange-coin.database';
import { ExchangeCoin } from '../models/exchange-coin.model';

export class ExchangeCoinDataSource extends DataSource<ExchangeCoin> {

  constructor(private database: ExchangeCoinDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ExchangeCoin[]> {
    const sources$ = merge(this.database.dataChange);

    return sources$.pipe(
      map(() => this.database.data.slice(),
    ));
  }

  disconnect() { }

}
