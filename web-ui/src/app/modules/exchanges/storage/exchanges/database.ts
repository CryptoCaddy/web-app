import { ApiError } from 'app/modules/shared/models/api-error.model';
import { Logger } from 'app/modules/shared/utils/logger.util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, tap } from 'rxjs/operators';

import { Exchange } from '../../models/exchange.model';
import { ExchangesApiService } from '../../services/exchanges-api/service';

export class ExchangesDatabase {

  /** Subject that broadcasts to the {@link data$} stream. */
  private _data$: BehaviorSubject<Exchange[]> = new BehaviorSubject([]);

  /** Subject that emits when the data in the database changes. */
  public data$: Observable<Exchange[]> = this._data$.asObservable();

  /**
   * Creates an instance of ExchangeDatabase immediatly requesting data.
   */
  constructor(private exchangesApi: ExchangesApiService) {

    this.loadFromStorage();

    // store exchange information in local storage on every update
    this.data$.subscribe((data) => {
      sessionStorage.setItem(this.constructor.name, JSON.stringify(data));
    });

  }

  public init(): void {
    this.exchangesApi.getStoredExchanges()
      .subscribe(
        (data: Exchange[]) => {
          this.initializeData(data);
        },
        (res: { error: ApiError }) => {
          console.error('@TODO', this.constructor.name, 'init');
        },
      );
  }

  public get data(): Exchange[] {
    return this._data$.value;
  }

  public add(exchange: Exchange): Observable<Exchange> {
    const data = this.data.slice()
      .concat([ { ...exchange } ]);

    return this.exchangesApi.checkCredentials(exchange).pipe(
      tap((type) => Logger.logChange(this.constructor.name, 'add', data)),
      tap(() => this._data$.next(data)),
    );
  }

  /** update an existing record */
  public update(exchange: Exchange): Observable<Exchange> {
    const index = this.getIndex(exchange);
    const data = [
      ...this.data.slice(0, index),
      { ...exchange },
      ...this.data.slice(index + 1),
    ];

    // @TODO real request - for now only delay for demonstration
    return of(exchange).pipe(
      delay(1000),
      tap(() => Logger.logChange(this.constructor.name, 'update', data)),
      tap(() => this._data$.next(data)),
    );
  }

  /** remove an existing record */
  public drop(exchange: Exchange): Observable<Exchange> {
    const index = this.getIndex(exchange);
    const data = [
      ...this.data.slice(0, index),
      ...this.data.slice(index + 1),
    ];

    // @TODO real request - for now only delay for demonstration
    return of(exchange).pipe(
      delay(1000),
      tap(() => Logger.logChange(this.constructor.name, 'drop', data)),
      tap(() => this._data$.next(data)),
    );
  }

  /** try to load data saved in users storage */
  private loadFromStorage(): void {
    let sessionData: Exchange[];

    // if data can not be loaded or does not exist, fail silently
    try {
      sessionData = JSON.parse(sessionStorage.getItem(this.constructor.name));
    } catch (_e) {
      return;
    }

    this._data$.next(sessionData);
    Logger.logChange(this.constructor.name, 'loadFromStorage', sessionData);
  }

  /** merge data retrieved from backend with possibly available data from storage*/
  private initializeData(data: Exchange[]): void {

    // if theres was no data in the users storage, just commit the servers data
    if (!this._data$.value || !this._data$.value.length) {
      this._data$.next(data);
      Logger.logChange(this.constructor.name, 'init', data);
      return;
    }

    // otherwise add missing data to the users data
    data = this.mergeData(this._data$.value, data);
    this._data$.next(data);
    Logger.logChange(this.constructor.name, 'init', data);
    return;
  }

  private mergeData(localData: Exchange[], serverData: Exchange[]): Exchange[] {
    const data: Exchange[] = localData.slice();
    for (const serverItem of serverData) {
      if (data.findIndex((item) => item.exchangeName === serverItem.exchangeName) === -1) {
        data.push(serverItem);
      }
    }

    return data;
  }

  private getIndex(exchange: Exchange): number {
    const index = this.data.findIndex((e) => e.exchangeName === exchange.exchangeName);
    if (index === -1) {
      throw new RangeError(`Element with exchangeName "${exchange.exchangeName}" does not exist.`);
    }

    return index;
  }

}
