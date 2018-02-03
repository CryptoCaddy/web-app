import { TrackByFunction } from '@angular/core';
import { sortBy, prop } from 'ramda';

export class ArrayUtil {

  /**
   * Returns a function that can be used to track by a specific property instead of writing
   * a specific trackBy method for each ngFor loop.
   *
   * @example trackItemBy = trackTypeBy<Item>();
   * @example <div *ngFor="let item of items; trackBy:trackItemBy('id')">
   */
  public static trackTypeBy<T>() {
    return (property: keyof T): TrackByFunction<T> => {
      return (_index: number, item: T) => {
        if (!(property in item)) {
          throw new ReferenceError(`Error in trackTypeBy: property "${property}" does not exist in item ${JSON.stringify(item)}`);
        }

        return item[property];
      };
    };
  }

  /** Immutable sort funtion to sort a given array of objects by a specific key of the objects. */
  public static sortByKey<T>(objects: T[], key: keyof T): T[] {
    return sortBy(prop(key))(objects);
  }

  /** Immutable method to add an element to an array. */
  public static add<T>(array: T[], item: T): T[] {
    return [ ...array, item ];
  }

  /** Immutable method to remove an element from an array. */
  public static remove<T>(array: T[], item: T): T[] {
    const index = array.indexOf(item);

    return [
      ...array.slice(0, index),
      ...array.slice(index + 1),
    ];
  }


}

