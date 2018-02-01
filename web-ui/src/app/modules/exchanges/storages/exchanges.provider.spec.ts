import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { Exchange } from '../models/exchange.model';
import { ExchangesApiService } from '../services/exchanges-api.service';
import { ExchangesProvider } from './exchanges.provider';

/** define middleware mock with default return values */
class ExchangesApiMock {
  public getStoredExchanges = () => of([ ]);
  public checkCredentials = () => of(true);
  public removeCredentials = () => of(true);
}

describe('ExchangesProvider', () => {
  let provider: ExchangesProvider;
  let apiMock: ExchangesApiMock;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [
        ExchangesProvider,
        { provide: ExchangesApiService, useClass: ExchangesApiMock },
      ],
    });

    provider = TestBed.get(ExchangesProvider);
    apiMock = TestBed.get(ExchangesApiService);
  });

  // Make sure the session storage is clean after each test
  afterEach(() => sessionStorage.clear());

  describe('intial Database state', () => {
    it('should be empty', () => {
      initDatabase(apiMock);
      expect(provider.get().data.length).toEqual(0);
    });

    it('should load data from sessionStorage', () => {
      sessionStorage.setItem('ExchangesDatabase', JSON.stringify([
        <Exchange>{ exchangeName: 'EXCHANGE1', exchangeKey: 'mockKey', exchangeSecret: 'mockSecret' },
      ]));
      initDatabase(apiMock);
      expect(provider.get().data.length).toEqual(1);
      expect(provider.get().data[0].exchangeName).toEqual('EXCHANGE1');
    });

    it('should handle invalid data in sessionStorage', () => {
      initDatabase(apiMock, 'invalidData' as any);
      expect(provider.get().data.length).toEqual(0);

      initDatabase(apiMock, { not: 'an array' } as any);
      expect(provider.get().data.length).toEqual(0);

      initDatabase(apiMock, [ 'not what we expected' ] as any);
      expect(provider.get().data.length).toEqual(0);
    });

    it('should handle data already stored on server', () => {
      apiMock.getStoredExchanges = jest.fn(() => of([
        { exchangeName: 'REMOTE_1', exchangeKey: 'RKEY_1', exchangeSecret: 'RSECRET_1' },
        { exchangeName: 'REMOTE_2', exchangeKey: 'RKEY_2', exchangeSecret: 'RSECRET_2' },
      ] as Exchange[]));

      initDatabase(apiMock);
      expect(provider.get().data.length).toEqual(2);
      expect(provider.get().data[0].exchangeName).toEqual('REMOTE_1');
      expect(provider.get().data[1].exchangeName).toEqual('REMOTE_2');
    });

    it('should simply merge local and remote data if there are no conflicts', () => {
      apiMock.getStoredExchanges = jest.fn(() => of([
        { exchangeName: 'REMOTE_1', exchangeKey: 'RKEY_1', exchangeSecret: 'RSECRET_1' },
        { exchangeName: 'REMOTE_2', exchangeKey: 'RKEY_2', exchangeSecret: 'RSECRET_2' },
      ] as Exchange[]));

      initDatabase(apiMock, [
        { exchangeName: 'LOCAL_1', exchangeKey: 'LKEY_1', exchangeSecret: 'LSECRET_1' },
        { exchangeName: 'LOCAL_2', exchangeKey: 'LKEY_2', exchangeSecret: 'LSECRET_2' },
      ]);
      expect(provider.get().data.length).toEqual(4);
      expect(provider.get().data[0].exchangeName).toEqual('LOCAL_1');
      expect(provider.get().data[1].exchangeName).toEqual('LOCAL_2');
      expect(provider.get().data[2].exchangeName).toEqual('REMOTE_1');
      expect(provider.get().data[3].exchangeName).toEqual('REMOTE_2');
    });

    it('should merge local and remote data if they\'re conflicting, favoring remote data', () => {
      apiMock.getStoredExchanges = jest.fn(() => of([
        { exchangeName: 'REMOTE_1', exchangeKey: 'RKEY_1', exchangeSecret: 'RSECRET_1' },
        { exchangeName: 'BOTH_2', exchangeKey: 'RKEY_2', exchangeSecret: 'RSECRET_2' },
      ] as Exchange[]));

      initDatabase(apiMock, [
        { exchangeName: 'LOCAL_1', exchangeKey: 'LKEY_1', exchangeSecret: 'LSECRET_1' },
        { exchangeName: 'BOTH_2', exchangeKey: 'LKEY_2', exchangeSecret: 'LSECRET_2' },
      ]);
      expect(provider.get().data.length).toEqual(3);
      expect(provider.get().data[0].exchangeName).toEqual('LOCAL_1');
      expect(provider.get().data[1].exchangeName).toEqual('BOTH_2');
      expect(provider.get().data[1].exchangeKey).toEqual('RKEY_2');
      expect(provider.get().data[1].exchangeSecret).toEqual('RSECRET_2');
      expect(provider.get().data[2].exchangeName).toEqual('REMOTE_1');
    });
  });

  describe('#save', () => {
    it('should add an element to the database', () => {
      const successFn = jest.fn();
      const errorFn = jest.fn();

      apiMock.checkCredentials = jest.fn(() => of(null));

      initDatabase(apiMock);
      expect(provider.get().data.length).toBe(0);

      provider.save({ exchangeName: 'EXCHANGE1', exchangeKey: 'KEY', exchangeSecret: 'SECRET' })
        .subscribe(successFn, errorFn);
      expect(provider.get().data.length).toBe(1);

      provider.save({ exchangeName: 'EXCHANGE2', exchangeKey: 'KEY', exchangeSecret: 'SECRET' })
        .subscribe(successFn, errorFn);
      expect(provider.get().data.length).toBe(2);

      expect(successFn).toHaveBeenCalledTimes(2);
      expect(errorFn).not.toHaveBeenCalled();
    });

    it('should propagate an error if an element could not be added', () => {
      apiMock.checkCredentials = jest.fn(() => _throw(null));
      const successFn = jest.fn();
      const errorFn = jest.fn();

      initDatabase(apiMock);
      expect(provider.get().data.length).toBe(0);

      provider.save({ exchangeName: 'EXCHANGE1', exchangeKey: 'KEY', exchangeSecret: 'SECRET' })
        .subscribe(successFn, errorFn);

      provider.save({ exchangeName: 'EXCHANGE2', exchangeKey: 'KEY', exchangeSecret: 'SECRET' })
        .subscribe(successFn, errorFn);

      expect(provider.get().data.length).toBe(0);
      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalledTimes(2);
    });

    it('should update an existing record', () => {
      const successFn = jest.fn();
      const errorFn = jest.fn();

      initDatabase(apiMock, [
        { exchangeName: 'EXCHANGE1', exchangeKey: 'KEY1A', exchangeSecret: 'SECRET1A' },
        { exchangeName: 'EXCHANGE2', exchangeKey: 'KEY2A', exchangeSecret: 'SECRET2A' },
      ]);
      expect(provider.get().data.length).toBe(2);

      provider.save({ exchangeName: 'EXCHANGE1', exchangeKey: 'KEY1B', exchangeSecret: 'SECRET1B' })
        .subscribe(successFn, errorFn);
      expect(successFn).toHaveBeenCalled();
      expect(errorFn).not.toHaveBeenCalled();
      expect(provider.get().data.length).toBe(2);
      expect(provider.get().data[0].exchangeKey).toBe('KEY1B');
      expect(provider.get().data[0].exchangeSecret).toBe('SECRET1B');
      expect(provider.get().data[1].exchangeKey).toBe('KEY2A');
      expect(provider.get().data[1].exchangeSecret).toBe('SECRET2A');

      successFn.mockReset();
      errorFn.mockReset();
      apiMock.checkCredentials = jest.fn(() => _throw('fooErr'));

      provider.save({ exchangeName: 'EXCHANGE2', exchangeKey: 'KEY2B', exchangeSecret: 'SECRET2B' })
        .subscribe(successFn, errorFn);
      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalled();
      expect(provider.get().data.length).toBe(2);
      expect(provider.get().data[0].exchangeKey).toBe('KEY1B');
      expect(provider.get().data[0].exchangeSecret).toBe('SECRET1B');
      expect(provider.get().data[1].exchangeKey).toBe('KEY2A');
      expect(provider.get().data[1].exchangeSecret).toBe('SECRET2A');
    });
  });

  describe('#remove', () => {
    it('should remove an existing entry from the database', () => {
      const successFn = jest.fn();
      const errorFn = jest.fn();

      initDatabase(apiMock, [
        { exchangeName: 'EXCHANGE1', exchangeKey: 'KEY1', exchangeSecret: 'SECRET1' },
        { exchangeName: 'EXCHANGE2', exchangeKey: 'KEY2', exchangeSecret: 'SECRET2' },
      ]);
      expect(provider.get().data.length).toBe(2);

      provider.remove({ exchangeName: 'EXCHANGE1' } as any).subscribe(successFn, errorFn);
      expect(successFn).toHaveBeenCalledTimes(1);
      expect(errorFn).not.toHaveBeenCalled();
      expect(provider.get().data.length).toBe(1);
      expect(provider.get().data[0].exchangeName).toEqual('EXCHANGE2');

      successFn.mockReset();
      errorFn.mockReset();

      provider.remove({ exchangeName: 'EXCHANGE1' } as any).subscribe(successFn, errorFn);
      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalledTimes(1);
      expect(provider.get().data.length).toBe(1);
      expect(provider.get().data[0].exchangeName).toEqual('EXCHANGE2');
    });
  });

});

function initDatabase(apiMock: ExchangesApiMock, initialState?: Exchange[]) {
  if (initialState) {
    sessionStorage.setItem('ExchangesDatabase', JSON.stringify(initialState));
  }
}
