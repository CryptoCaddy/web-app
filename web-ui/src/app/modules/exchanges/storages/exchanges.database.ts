import { ApiError } from 'app/modules/shared/models/api-error.model';
import { Logger } from 'app/modules/shared/utils/logger.util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, tap } from 'rxjs/operators';

import { Exchange, isExchange } from '../models/exchange.model';
import { ExchangesApiService } from '../services/exchanges-api.service';
import { loadFromStorage } from 'app/modules/shared/utils/database.util';

export class ExchangesDatabase {

  /** Subject that broadcasts to the {@link data$} stream. */
  private _data$: BehaviorSubject<Exchange[]> = new BehaviorSubject([ ]);

  /** Stream that emits when the data in the database changes. */
  public data$: Observable<Exchange[]> = this._data$.asObservable();

  /** the the current state of the database data */
  public get data(): Exchange[] { return this._data$.value; }

  /**
   * Creates an instance of ExchangeDatabase immediatly requesting data.
   */
  constructor(private exchangesApi: ExchangesApiService) {

    const storedData = loadFromStorage(sessionStorage, this.constructor.name, isExchange);
    this._data$.next(storedData);

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

  /** add an exchange to the database */
  public add(exchange: Exchange): Observable<Exchange> {
    const data = this.data.slice()
      .concat([ { ...exchange } ]);

    return this.exchangesApi.checkCredentials(exchange).pipe(
      tap(() => this._data$.next(data)),
      tap((type) => Logger.logGroup(this.constructor.name, 'add', data)),
    );
  }

  /** update an existing record */
  public update(exchange: Exchange): Observable<Exchange> {

    return this.exchangesApi.checkCredentials(exchange).pipe(
      catchError((err) => {
        return _throw(err);
      }),
      tap(() => {
        const result = this.getIndex(exchange);
        if (typeof result === 'string') {
          return _throw(result);
        }

        const data = [
          ...this.data.slice(0, result),
          { ...exchange },
          ...this.data.slice(result + 1),
        ];
        this._data$.next(data);
        Logger.logGroup(this.constructor.name, 'update', data);
      }),
    );
  }

  /** remove an existing record */
  public drop(exchange: Exchange): Observable<boolean> {
    const result = this.getIndex(exchange);
    if (typeof result === 'string') {
      return _throw(result);
    }

    const data = [
      ...this.data.slice(0, result),
      ...this.data.slice(result + 1),
    ];

    // @TODO real request - for now only delay for demonstration
    return this.exchangesApi.removeCredentials(exchange).pipe(
      tap(() => Logger.logGroup(this.constructor.name, 'drop', data)),
      tap(() => this._data$.next(data)),
    );
  }

  /** merge data retrieved from remote with possibly available data from storage*/
  private initializeData(remoteData: Exchange[]): void {

    // if theres was no data in the users storage, just commit the servers data
    if (!this._data$.value || !this._data$.value.length) {
      this._data$.next(remoteData);
      Logger.logGroup(this.constructor.name, 'init', remoteData);
      return;
    }

    // otherwise add missing data to the users data
    const data = this.mergeData(this._data$.value, remoteData);
    this._data$.next(data);
    Logger.logGroup(this.constructor.name, 'init', data);
    return;
  }

  /**
   * merges two exchange arrays into one
   * if an entry exists twice (matching the key), the one in `second` is prefered
   */
  private mergeData(first: Exchange[], second: Exchange[]): Exchange[] {
    let data: Exchange[] = first.slice();
    for (const secondItem of second) {
      const index = data.findIndex((item) => item.exchangeName === secondItem.exchangeName);
      if (index === -1) {
        data = data.concat([ secondItem ]);
      } else {
        data = [
          ...data.slice(0, index),
          secondItem,
          ...data.slice(index + 1),
        ];
      }
    }

    return data;
  }

  /**
   * get the index of the given exchange in the data array
   * if none is present, returns a string that should be thrown as ObservableError
   */
  private getIndex(exchange: Exchange): number|string {
    const index = this.data.findIndex((e) => e.exchangeName === exchange.exchangeName);
    if (index === -1) {
      return `Element with exchangeName "${exchange}" does not exist.`;
    }

    return index;
  }

}
