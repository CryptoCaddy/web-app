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

    it('should call the /addExchanges endpoint', async () => {
      mockHttp
        .onPost('/api/addExchange', exchangeToAdd)
        .replyOnce(201, { });
      ExchangesApi.addExchange(exchangeToAdd);

      expect(axios.post)
        .toHaveBeenCalledWith('/api/addExchange', exchangeToAdd);
    });

    describe('when succeeded', () => {
      it('should resolve a promise', () => {
        mockHttp
          .onPost('/api/addExchange')
          .replyOnce(201, { });

        expect(ExchangesApi.addExchange(exchangeToAdd))
          .resolves.toEqual(expect.any(Object));
      });
    });

    describe('when failed', () => {
      it('should reject with an error message', () => {
        mockHttp
          .onGet('/api/addExchange')
          .replyOnce(404);

        expect(ExchangesApi.addExchange(exchangeToAdd))
          .rejects.toEqual(Error('Request failed with status code 404'));
      });
    });
  });

  describe('getSupportedExchanges()', () => {
    function replyValid() {
      mockHttp
        .onGet('/api/supportedExchanges')
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
        .toHaveBeenCalledWith('/api/supportedExchanges');
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

      it('should throw on invalid responses', async () => {
        mockHttp
          .onGet('/api/supportedExchanges')
          .replyOnce(200, { });

        expect(await ExchangesApi.getSupportedExchanges().catch(errorFn))
          .toEqual(undefined);
        expect(errorFn).toHaveBeenCalledWith(new Error('Data could not be loaded.'));
      });
    });

    describe('when failed', () => {
      it('should reject with an error message', async () => {
        mockHttp
          .onGet('/api/supportedExchanges')
          .replyOnce(404);

        expect(await ExchangesApi.getSupportedExchanges().catch(errorFn))
          .toEqual(undefined);
        expect(errorFn).toHaveBeenCalledWith(new Error('Request failed with status code 404'));
      });
    });
  });

  describe('getWallets()', () => {
    it('should call the /exchangeWallets endpoint', async () => {
      mockHttp
        .onGet('/api/exchangeWallets')
        .replyOnce(200, { allExchangeWrappers: [] });
      ExchangesApi.getWallets();

      expect(axios.get)
        .toHaveBeenCalledWith('/api/exchangeWallets');
    });

    describe('when succeeded', () => {
      it('should resolve a promise', () => {
        mockHttp
          .onGet('/api/exchangeWallets')
          .replyOnce(200, { allExchangeWrappers: [] });

        expect(ExchangesApi.getWallets())
          .resolves.toEqual(expect.any(Object));
      });
    });

    describe('when failed', () => {
      it('should reject with an error message', () => {
        mockHttp
          .onGet('/api/exchangeWallets')
          .replyOnce(404);

        expect(ExchangesApi.getWallets())
          .rejects.toEqual(Error('Request failed with status code 404'));
      });
    });
  });
});
