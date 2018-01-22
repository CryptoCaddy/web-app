import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { SupportedExchange } from '../../models/supported-exchange.model';
import { ExchangesApiService } from '../../services/exchanges-api/service';

export class SupportedExchangesDatabase {

  /** Subject that broadcasts to the {@link data$} stream. */
  private _data$: BehaviorSubject<SupportedExchange[]> = new BehaviorSubject([]);

  /** Subject that emits when the data in the database changes. */
  public data$: Observable<SupportedExchange[]> = this._data$.asObservable();
  /**
   * Creates an instance of ExchangeDatabase immediatly requesting data.
   */
  constructor(private exchangesApi: ExchangesApiService) { }

  public init(): void {
    this.exchangesApi.getSupportedExchanges()
      .subscribe((data: SupportedExchange[]) => this._data$.next(data));
  }

  public get data(): SupportedExchange[] {
    return this._data$.value;
  }

}
