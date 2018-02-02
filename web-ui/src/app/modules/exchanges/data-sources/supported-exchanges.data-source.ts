import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { SupportedExchange } from '../models/supported-exchange.model';
import { SupportedExchangesProvider } from '../storages/supported-exchanges.provider';

export class SupportedExchangesDataSource extends DataSource<SupportedExchange> {

  constructor(private provider: SupportedExchangesProvider) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SupportedExchange[]> {
    const sources$ = combineLatest(this.provider.data$);

    return sources$.pipe(
      map(([ supportedExchanges ]) => supportedExchanges.slice(),
    ));
  }

  disconnect() { }

}
