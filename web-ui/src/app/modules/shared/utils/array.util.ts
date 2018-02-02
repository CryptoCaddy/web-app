import { TrackByFunction } from '@angular/core';
import { sortBy, prop } from 'ramda';

/**
 * Returns a function that can be used to track by a specific property instead of writing
 * a specific trackBy method for each ngFor loop.
 *
 * @example trackItemBy = trackTypeBy<Item>();
 * @example <div *ngFor="let item of items; trackBy:trackItemBy('id')">
 */
export function trackTypeBy<T>() {
  return (property: keyof T): TrackByFunction<T> => {
    return (_index: number, item: T) => {
      if (!(property in item)) {
        throw new ReferenceError(`Error in trackTypeBy: property "${property}" does not exist in item ${JSON.stringify(item)}`);
      }

      return item[property];
    };
  };
}

/**
 * Immutable sort funtion to sort a given array of objects by a specific key of the objects.
 */
export function sortByKey<T>(objects: T[], key: keyof T): T[] {
  return sortBy(prop(key))(objects);
}
