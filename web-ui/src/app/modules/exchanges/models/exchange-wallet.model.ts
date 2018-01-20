import { ExchangeCoin } from './exchange-coin.model';

export interface ExchangeWallet {
  exchangeName: string;
  coins: ExchangeCoin[];
}
