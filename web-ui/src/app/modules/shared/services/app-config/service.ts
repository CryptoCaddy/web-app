import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AppConfigService {

  public get apiUri(): string {
    return '/api';
  }

}
