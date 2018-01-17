import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppConfigService } from 'app/modules/shared/app-config.service';

import { ExchangeWalletsApiService } from './exchange-wallets-api.service';

class AppConfigServiceMock extends AppConfigService {
  get apiUrl(): string { return '/api'; }
}

describe('ExchangeWalletsApiService', () => {
  let service: ExchangeWalletsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ExchangeWalletsApiService,
        { provide: AppConfigService, useClass: AppConfigServiceMock },
      ],
    });

    service = TestBed.get(ExchangeWalletsApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
