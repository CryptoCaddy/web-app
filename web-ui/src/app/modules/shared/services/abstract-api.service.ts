import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class AbstractApiService<T> {

  constructor() { }

  /** Load existing items from the remote. */
  public abstract list(): Observable<T[]>;

  /** Add an item to the remote. */
  public abstract add(item: T): Observable<T>;

  /** Update an item on the rmeote. */
  public abstract update(item: T): Observable<T>;

  /** Drop an item on the remote. */
  public abstract drop(item: T): Observable<boolean>;

}
