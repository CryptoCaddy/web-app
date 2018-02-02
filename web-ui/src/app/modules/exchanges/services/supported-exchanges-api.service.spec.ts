import { TestBed, inject } from '@angular/core/testing';

import { SupportedExchangesApiService } from './supported-exchanges-api.service';

describe('SupportedExchangesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SupportedExchangesApiService ],
    });
  });

  it('should be created', inject([ SupportedExchangesApiService ], (service: SupportedExchangesApiService) => {
    expect(service).toBeTruthy();
  }));
});
