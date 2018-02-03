import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ApiError } from '../models/api-error.model';
import { AbstractApiService } from '../services/abstract-api.service';
import { loadFromStorage } from '../utils/database.util';
import { Logger } from '../utils/logger.util';
import { tap, catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export abstract class AbstractProvider<T> {

  protected abstract idProperty: string;

  protected data = new BehaviorSubject<T[]>([ ]);
  public data$ = this.data.asObservable();

  /**
   * Create the provider initially loading data from storage and setting up a subscription
   * for storing data on change.
   *
   * @param api The api service to use for remote interactions.
   * @param storage The storage to use (e.g. `localStorage`, `sessionStorage`).
   *  If none is defined, the data will not be stored locally.
   * @param isType A matcher to verify loaded data matches the expected type.
   */
  constructor(
    private api: AbstractApiService<T>,
    storage: Storage|null,
    isType: (o) => o is T,
  ) {
    if (storage) {
      this.initStorage(storage, isType);
    }
  }

  /**
   * Initialize the provider loading existing items from remote.
   * @returns The existing items.
   */
  public init(): void {
    this.api.list().subscribe(
      (data: T[]) => this.initializeData(data),
      (err: { error: ApiError }) => console.error(this.constructor.name, 'init', err),
    );
  }

  /**
   * Store an item and sync it to the remote.
   * @returns The stored item.
   */
  public add(item: Partial<T>): Observable<T> {
    return this.api.add(item).pipe(
      tap((itemResponse) => {
        const data = this.data.value.slice().concat([ { ...<any>itemResponse } ]);
        this.data.next(data);
        Logger.logGroup(this.constructor.name, 'add', data);
      }),
    );
  }

  /**
   * Update an existing item and sync the changes to the remote.
   * @returns The updated item.
   */
  public update(item: T): Observable<T> {
    const result = this.getIndex(item);
    if (typeof result === 'string') { return _throw(result); }

    return this.api.update(item).pipe(
      catchError((err) => _throw(err)),
      tap((responseItem) => {
        const data = [
          ...this.data.value.slice(0, result),
          { ...<any>responseItem },
          ...this.data.value.slice(result + 1),
        ];

        this.data.next(data);
        Logger.logGroup(this.constructor.name, 'update', data);
      }),
    );
  }

  /**
   * Drop an item and sync it to the remote.
   * @returns Whether the operation succeeded.
   */
  public drop(item: T): Observable<boolean> {
    const result = this.getIndex(item);
    if (typeof result === 'string') { return _throw(result); }

    const data = [
      ...this.data.value.slice(0, result),
      ...this.data.value.slice(result + 1),
    ];

    return this.api.drop(item).pipe(
      tap(() => Logger.logGroup(this.constructor.name, 'drop', data)),
      tap(() => this.data.next(data)),
    );
  }

  /** Initialize loading from and saving to storage */
  private initStorage(storage: Storage, isType: (o) => o is T) {
    const storedData = loadFromStorage<T>(storage, this.constructor.name, isType);
    this.data.next(storedData);

    // store data in local storage on every update
    this.data$.subscribe((data) => {
      storage.setItem(this.constructor.name, JSON.stringify(data));
    });
  }

  /**
   * Get the index of the given exchange in the data array.
   * If none is present, returns a string that should be thrown as ObservableError.
   */
  private getIndex(item: T): number|string {
    const id = item[this.idProperty];
    const index = this.data.value.findIndex((e) => e[this.idProperty] === id);

    if (index === -1) {
      return `${this.constructor.name}#getIndex: Element with ${this.idProperty} "${id}" does not exist.`;
    }

    return index;
  }

  /**
   * Merge data retrieved from remote with already available data in storage.
   * @param remoteData The remotes data.
   */
  private initializeData(remoteData: T[]): void {

    // if theres was no data in the users storage, just commit the servers data
    if (!this.data.value || !this.data.value.length) {
      this.data.next(remoteData);
      Logger.logGroup(this.constructor.name, 'init', remoteData);
      return;
    }

    // otherwise add missing data to the users data
    const data = this.mergeData(this.data.value, remoteData);
    this.data.next(data);
    Logger.logGroup(this.constructor.name, 'init', data);
    return;
  }

  /**
   * Merges two data arrays into one.
   * If an entry exists twice (matching the {@link idProperty}), the one in `second` is prefered
   * @param first The data used as base (usually from storage).
   * @param second The data to be applied (usually from remote).
   */
  private mergeData(first: T[], second: T[]): T[] {
    let data: T[] = first.slice();
    for (const secondItem of second) {
      const index = data.findIndex((item) => item[this.idProperty] === secondItem[this.idProperty]);
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
}
