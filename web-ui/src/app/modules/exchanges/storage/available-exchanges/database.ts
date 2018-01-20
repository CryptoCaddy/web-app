import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AvailableExchange } from '../../models/available-exchange.model';
import { ExchangesApiService } from '../../services/exchanges-api/service';

export class AvailableExchangesDatabase {

  /** Subject that broadcasts to the {@link data$} stream. */
  private _data$: BehaviorSubject<AvailableExchange[]> = new BehaviorSubject([]);

  /** Subject that emits when the data in the database changes. */
  public data$: Observable<AvailableExchange[]> = this._data$.asObservable();
  /**
   * Creates an instance of ExchangeDatabase immediatly requesting data.
   */
  constructor(private exchangesApi: ExchangesApiService) { }

  public init(): void {
    this.exchangesApi.getSupportedExchanges()
      .subscribe((data: AvailableExchange[]) => this._data$.next(data));
  }

  public get data(): AvailableExchange[] {
    return this._data$.value;
  }

}
