// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppConfigService } from 'app/modules/shared/services/app-config.service';

import { ExchangesApiService } from './exchanges-api.service';

class AppConfigServiceMock extends AppConfigService {
  get apiUrl(): string { return '/api'; }
}

describe('ExchangeWalletsApiService', () => {
  let service: ExchangesApiService;
  // let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [
      //   HttpClientTestingModule,
      // ],
      providers: [
        ExchangesApiService,
        { provide: AppConfigService, useClass: AppConfigServiceMock },
      ],
    });

    service = TestBed.get(ExchangesApiService);
    // httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
