import { ExchangeAddRequest, SupportedExchangeResponse } from '@/api/exchanges.models';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ExchangesApi } from '../exchanges';

const mockHttp = new MockAdapter(axios);

describe('ExchangesApi', () => {
  const errorFn = jest.fn();

  beforeEach(() => {
    errorFn.mockReset();
    jest.spyOn(axios, 'get');
    jest.spyOn(axios, 'post');
  });

  afterEach(() => {
    jest.spyOn(axios, 'get').mockRestore();
    jest.spyOn(axios, 'post').mockRestore();
  });

  describe('addExchange()', () => {
    const exchangeToAdd: ExchangeAddRequest = {
      exchangeName: 'BINANCE',
      parameters: {
        'api key': 'the-api-key',
        'api secret': 'the-api-secret',
      },
    };

    it('should call the /user-exchange/add endpoint', async () => {
      mockHttp
        .onPost('/api/user-exchange/add', exchangeToAdd)
        .replyOnce(201, { });
      ExchangesApi.addExchange(exchangeToAdd);

      expect(axios.post)
        .toHaveBeenCalledWith('/api/user-exchange/add', exchangeToAdd);
    });

    describe('when succeeded', () => {
      it('should resolve a promise', () => {
        mockHttp
          .onPost('/api/user-exchange/add')
          .replyOnce(201, { });

        expect(ExchangesApi.addExchange(exchangeToAdd))
          .resolves.toEqual(expect.any(Object));
      });
    });

    describe('when failed', () => {
      it('should reject with an error message', () => {
        mockHttp
          .onGet('/api/user-exchange/add')
          .replyOnce(404);

        expect(ExchangesApi.addExchange(exchangeToAdd))
          .rejects.toEqual(Error('Request failed with status code 404'));
      });
    });
  });

  describe('getSupportedExchanges()', () => {
    function replyValid() {
      mockHttp
        .onGet('/api/exchanges/supported')
        .replyOnce(200, {
          exchangeToParameterMap: {
            BINANCE: {
              key: 'BINANCE',
              parameterList: [
                { parameter: 'api key', type: 'string' },
                { parameter: 'api secret', type: 'string' },
              ],
            },
          },
        } as SupportedExchangeResponse);
    }

    it('should call the right api endpoint', () => {
      replyValid();
      ExchangesApi.getSupportedExchanges();

      expect(axios.get)
        .toHaveBeenCalledWith('/api/exchanges/supported');
    });

    describe('when succeeded', () => {
      it('should resolve a promise', () => {
        replyValid();

        expect(ExchangesApi.getSupportedExchanges())
          .resolves.toEqual(expect.any(Object));
      });

      it('should transform the response', () => {
        replyValid();

        expect(ExchangesApi.getSupportedExchanges())
          .resolves.toEqual([
            {
              key: 'BINANCE',
              parameterList: [
                { parameter: 'api key', type: 'string' },
                { parameter: 'api secret', type: 'string' },
              ],
            },
          ]);
      });

      fit('should catch invalid responses', async () => {
        mockHttp
          .onGet('/api/exchanges/supported')
          .replyOnce(200, { });

        await ExchangesApi.getSupportedExchanges().catch(errorFn);
        expect(errorFn)
          .toHaveBeenCalledWith(new Error('Data could not be loaded.'));
      });
    });

    describe('when failed', () => {
      it('should reject with an error message', async () => {
        mockHttp
          .onGet('/api/exchanges/supported')
          .replyOnce(404);

        await ExchangesApi.getSupportedExchanges().catch(errorFn);
        expect(errorFn)
          .toHaveBeenCalledWith(new Error('Request failed with status code 404'));
      });
    });
  });

  describe('getWallets()', () => {
    it('should call the /user-exchange/wallets endpoint', async () => {
      mockHttp
        .onGet('/api/user-exchange/wallets')
        .replyOnce(200, { allExchangeWrappers: [] });
      ExchangesApi.getWallets();

      expect(axios.get)
        .toHaveBeenCalledWith('/api/user-exchange/wallets');
    });

    describe('when succeeded', () => {
      it('should resolve a promise', () => {
        mockHttp
          .onGet('/api/user-exchange/wallets')
          .replyOnce(200, { allExchangeWrappers: [] });

        expect(ExchangesApi.getWallets())
          .resolves.toEqual(expect.any(Object));
      });
    });

    describe('when failed', () => {
      it('should reject with an error message', () => {
        mockHttp
          .onGet('/api/user-exchange/wallets')
          .replyOnce(404);

        expect(ExchangesApi.getWallets())
          .rejects.toEqual(Error('Request failed with status code 404'));
      });
    });
  });
});
