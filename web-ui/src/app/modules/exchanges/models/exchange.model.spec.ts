import { Exchange, isExchange } from './exchange.model';
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

});
