import { environment } from 'environments/environment';


export class Logger {

  public static logChange(groupName: string, action: string, data: any) {
    if (!environment.production) {
      console.groupCollapsed(`${groupName}::${action}`);
      console.info(data);
      // tslint:disable-next-line:no-console
      console.trace(undefined, {  });
      console.groupEnd();
    }
  }

}
