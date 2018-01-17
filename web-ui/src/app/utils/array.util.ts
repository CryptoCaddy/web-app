import { TrackByFunction } from '@angular/core';

/**
 * Returns a function that can be used to track by a specific property instead of writing
 * a specific trackBy method for each ngFor loop.
 *
 * @example trackItemBy = trackTypeBy<Item>();
 * @example <div *ngFor="let item of items; trackBy:trackItemBy('id')">
 *
 * @export
 * @template T
 * @returns
 */
export function trackTypeBy<T>() {
  return (property: keyof T): TrackByFunction<T> => {
    return (index: number, item: T) => {
      const prop = item[property];
      return prop || index;
    };
  };
}
