import { environment } from 'environments/environment';

export class Logger {

  public static logChange(groupName: string, action: string, data: any) {

    // Don't log in production or when testing
    if (!environment.production && !window['__isJest']) {
      console.groupCollapsed(`${groupName}::${action}`);
      console.info(data);
      console.groupEnd();
    }

  }

}
