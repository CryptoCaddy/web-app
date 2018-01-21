import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AppConfigService {

  public get apiUri(): string {
    switch (environment.production) {
      case true:
        return '/api';

      default:
        return 'http://localhost:8080/api';
    }
  }

}
