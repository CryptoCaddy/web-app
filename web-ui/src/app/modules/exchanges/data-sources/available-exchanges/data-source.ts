import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { AvailableExchange } from '../../models/available-exchange.model';
import { AvailableExchangesDatabase } from '../../storage/available-exchanges/database';

export class AvailableExchangesDataSource extends DataSource<AvailableExchange> {

  constructor(private database: AvailableExchangesDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AvailableExchange[]> {
    const sources$ = merge(this.database.data$);

    return sources$.pipe(
      map(() => this.database.data.slice(),
    ));
  }

  disconnect() { }

}
