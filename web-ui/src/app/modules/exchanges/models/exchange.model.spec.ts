import { computeExchangeFields, Exchange, isExchange } from './exchange.model';
import * as deepFreeze from 'deep-freeze';

describe('ExchangeModel', () => {

  describe('isExchange', () => {
    it('should return true if a given input implements the ExchangeModel interface', () => {
      expect(isExchange({ exchangeName: '', exchangeKey: '', exchangeSecret: '' } as any)).toEqual(true);
      expect(isExchange({ exchangeName: '', exchangeKey: '', exchangeSecret: '', exchangePass: '' } as any)).toEqual(true);
    });

    it('should return false if a given input does not implement the ExchangeModel interface', () => {

      // wrong types
      expect(isExchange(null)).toEqual(false);
      expect(isExchange(undefined)).toEqual(false);
      expect(isExchange('1' as any)).toEqual(false);
      expect(isExchange('asd' as any)).toEqual(false);
      expect(isExchange([ ] as any)).toEqual(false);

      // missing properties
      expect(isExchange({ } as any)).toEqual(false);
      expect(isExchange({ foo: 'bar' } as any)).toEqual(false);
      expect(isExchange({ exchangeName: 'EXCHANGE' } as any)).toEqual(false);
      expect(isExchange({ exchangeName: 'EXCHANGE', exchangeKey: 'KEY' } as any)).toEqual(false);
      expect(isExchange({ exchangeName: 'EXCHANGE', exchangeKey: 'KEY', exchangePass: 'PASS' } as any)).toEqual(false);
      expect(isExchange({ exchangeName: 'EXCHANGE', exchangeSecret: 'SECRET', exchangePass: 'PASS' } as any)).toEqual(false);
      expect(isExchange({ exchangeKey: 'KEY', exchangeSecret: 'SECRET', exchangePass: 'PASS' } as any)).toEqual(false);

      // wrong property types
      expect(isExchange({ exchangeName: 1, exchangeKey: '', exchangeSecret: '', exchangePass: '' } as any)).toEqual(false);
      expect(isExchange({ exchangeName: '', exchangeKey: null, exchangeSecret: '', exchangePass: '' } as any)).toEqual(false);
      expect(isExchange({ exchangeName: '', exchangeKey: '', exchangeSecret: undefined, exchangePass: '' } as any)).toEqual(false);
      expect(isExchange({ exchangeName: '', exchangeKey: '', exchangeSecret: undefined, exchangePass: { } } as any)).toEqual(false);
    });
  });

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
