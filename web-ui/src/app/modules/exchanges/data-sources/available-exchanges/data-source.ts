import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { SupportedExchange } from '../../models/supported-exchange.model';
import { SupportedExchangesDatabase } from '../../storage/supported-exchanges/database';

export class SupportedExchangesDataSource extends DataSource<SupportedExchange> {

  constructor(private database: SupportedExchangesDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SupportedExchange[]> {
    const sources$ = merge(this.database.data$);

    return sources$.pipe(
      map(() => this.database.data.slice(),
    ));
  }

  disconnect() { }

}
