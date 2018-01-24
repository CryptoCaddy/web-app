import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppConfigService } from 'app/modules/shared/services/app-config.service';

import { ExchangesApiService } from '../services/exchanges-api.service';
import { ExchangeWalletsProvider } from './exchange-wallets.provider';

class ExchangesApiServiceMock extends ExchangesApiService { }
class AppConfigServiceMock extends AppConfigService { }

describe('ExchangeWalletService', () => {
  let service: ExchangeWalletsProvider;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ExchangeWalletsProvider,
        { provide: ExchangesApiService, useClass: ExchangesApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock },
      ],
    });

    service = TestBed.get(ExchangeWalletsProvider);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
