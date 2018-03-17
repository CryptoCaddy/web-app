import * as R from 'ramda';

export function sortBy<T>(items: T[], key: keyof T, caseSensitive = false) {
  let byLabel = R.compose(R.toString, R.prop(key));
  if (!caseSensitive) {
    byLabel = R.compose(R.toLower, byLabel);
  }
  return R.sortBy(byLabel, items) as T[];
}
