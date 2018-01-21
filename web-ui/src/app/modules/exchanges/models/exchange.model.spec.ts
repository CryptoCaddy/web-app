import { computeExchangeFields, Exchange } from './exchange.model';
import * as deepFreeze from 'deep-freeze';

describe('ExchangeModel', () => {

  describe('computeExchangeFields', () => {

    it('should compute the `isStored` field', () => {
      const input: Exchange[] = deepFreeze([
        { exchangeName: 'EXCHANGE1', exchangeKey: '', exchangeSecret: '' },
        { exchangeName: 'EXCHANGE2', exchangeKey: null, exchangeSecret: null },
        { exchangeName: 'EXCHANGE3', exchangeKey: 'testKey', exchangeSecret: 'testSecret' },
        { exchangeName: 'EXCHANGE4', exchangeKey: null, exchangeSecret: 'testSecret' },
        { exchangeName: 'EXCHANGE5', exchangeKey: 'testKey', exchangeSecret: false },
      ]) as Exchange[];
      const expected: boolean[] = [ false, false, true, false, false ];

      expect(input.map(computeExchangeFields).map(e => e.isStored)).toEqual(expected);
    });

  });

});
