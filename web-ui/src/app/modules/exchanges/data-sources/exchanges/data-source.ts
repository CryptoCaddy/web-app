import { DataSource } from '@angular/cdk/table';
import { sortByKey } from 'app/modules/shared/utils/array.util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { SupportedExchange } from '../../models/supported-exchange.model';
import { computeExchangeFields, Exchange } from '../../models/exchange.model';
import { SupportedExchangesDatabase } from '../../storage/supported-exchanges/database';
import { ExchangesDatabase } from '../../storage/exchanges/database';

export class ExchangesDataSource extends DataSource<SupportedExchange> {

  private _enabledOnly = new BehaviorSubject<boolean>(false);
  public get enabledOnly(): boolean { return this._enabledOnly.value; }
  public set enabledOnly(v: boolean) { this._enabledOnly.next(v); }

  constructor(
    private supportedExchangesDb: SupportedExchangesDatabase,
    private exchangesDb: ExchangesDatabase,
  ) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Exchange[]> {
    const sources$ = merge(
      this.supportedExchangesDb.data$,
      this.exchangesDb.data$,
      this._enabledOnly,
    );

    const stream$ = sources$.pipe(
      map(() => {
        // return only enabled exchanges here, if filter is enabled
        if (this._enabledOnly.value) {
          return this.exchangesDb.data;
        }

        // otherwise add missing exchanges from the SupportedExchanges database
        return addMissingFromAvailable(this.exchangesDb.data, this.supportedExchangesDb.data);
      }),
      map((exchanges) => sortByKey(exchanges, 'exchangeName')),
      map((exchanges) => exchanges.map(computeExchangeFields)),
    );

    return stream$;
  }

  disconnect() { }

}

export function addMissingFromAvailable(present: Exchange[], available: SupportedExchange[]): Exchange[] {
  return [
    ...present,
    ...available
      .filter((a) => !present.map((p) => p.exchangeName).includes(a.exchangeName))
      .map((a) => (<Exchange>{ ...a })),
  ];
}
