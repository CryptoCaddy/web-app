import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { ExchangesApiService } from '../services/exchanges-api.service';
import { SupportedExchangesProvider } from './supported-exchanges.provider';

/** define middleware mock with default return values */
class ExchangesApiMock {
  public getSupportedExchanges = () => of([ ]);
}

describe('SupportedExchangesProvider', () => {
  let provider: SupportedExchangesProvider;
  let apiMock: ExchangesApiMock;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [
        SupportedExchangesProvider,
        { provide: ExchangesApiService, useClass: ExchangesApiMock },
      ],
    });

    provider = TestBed.get(SupportedExchangesProvider);
    apiMock = TestBed.get(ExchangesApiService);
  });

  // Make sure the session storage is clean after each test
  afterEach(() => sessionStorage.clear());

  describe('intial Database state', () => {
    it('should be empty', () => {
      expect(provider.get().data.length).toEqual(0);
    });
  });

});
