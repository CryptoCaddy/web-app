import { Logger } from 'app/modules/shared/utils/logger.util';

/**
 * try to load data saved in users storage
 *
 * @param dataValidator a validator function used for checking if the loaded data
 * matches the expected model
 */
export function loadFromStorage<T>(
  storage: Storage,
  databaseName: string,
  dataValidator: (item: T) => boolean,
): T[] {
  let storedData: T[];

  const storedString = storage.getItem(databaseName);
  if (!storedString) {
    return [ ];
  }

  try {
    storedData = JSON.parse(storedString);
  } catch (e) { }

  if (!storedData || !(storedData instanceof Array)) {
    return [ ];
  }

  storedData = storedData.filter((item) => dataValidator(item));

  Logger.logGroup(databaseName, 'loadFromStorage', storedData);
  return storedData;

}
