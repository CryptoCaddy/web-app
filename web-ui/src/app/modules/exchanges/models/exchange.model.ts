import { Coin } from 'app/modules/wallet/models/coin';
import { ExchangeTrade } from './exchange-trade.model';

export interface Exchange {

  /**
   * Exchange identifier.
   * @TODO mocked - currently using apikey as id
   */
  exchangeId: string;

  /** Exchange name. */
  exchangeName: string;

  /**
   * Exchange api credentials.  
   * @TODO Should be stripped down to api key only as soon as persistence is available.
   */
  parameters: {
    [key: string]: string|number;
  };

  /** Trade history for the exchange. */
  txHistory: ExchangeTrade[];

  /** Balance of the exchange. */
  exchangeCoins: Coin[];
}

/** Check if the given object is an exchange.  */
export function isExchange(o: any): o is Exchange {
  return o != null &&
    (typeof o === 'object') &&

    // required
    typeof o.exchangeId === 'number' &&
    typeof o.exchangeName === 'string' &&
    typeof o.parameters === 'object' &&

    // optional
    o.txHistory == null || typeof o.txHistory === 'object' &&
    o.exchangeCoins == null || typeof o.exchangeCoins === 'object'
    ;
}
