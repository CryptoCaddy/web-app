import { TestBed } from '@angular/core/testing';

import { ExchangeWalletsApiService } from './api/exchange-wallets-api.service';
import { ExchangeWalletService } from './exchange-wallet.service';
import { AppConfigService } from 'app/modules/shared/app-config.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

class ExchangeWalletsApiServiceMock extends ExchangeWalletsApiService { }
class AppConfigServiceMock extends AppConfigService { }

describe('ExchangeWalletService', () => {
  let service: ExchangeWalletService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ExchangeWalletService,
        { provide: ExchangeWalletsApiService, useClass: ExchangeWalletsApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock },
      ],
    });

    service = TestBed.get(ExchangeWalletService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
