import { environment } from 'environments/environment';

export class Logger {

  public static logGroup(
    groupName: string,
    action: string,
    data?: any,
    type: 'info'|'warn'|'error' = 'info',
  ) {

    // Don't sign in production or when testing
    if (!environment.production && !window['__isJest']) {
      console.groupCollapsed(`${groupName}::${action}`);
      if (data) { console[type](data); }
      console.groupEnd();
    }

  }

}
