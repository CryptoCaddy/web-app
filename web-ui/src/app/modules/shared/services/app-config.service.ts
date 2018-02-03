import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

  public get apiUri(): string {
    return '/api';
  }

}
