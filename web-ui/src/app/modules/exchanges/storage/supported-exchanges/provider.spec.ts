import { TestBed } from '@angular/core/testing';
import { ExchangesApiService } from 'app/modules/exchanges/services/exchanges-api/service';
import { of } from 'rxjs/observable/of';

import { Exchange } from '../../models/exchange.model';
import { SupportedExchangesProvider } from './provider';

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
