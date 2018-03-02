import { ExchangeTrade, ExchangeWallet, SupportedExchange } from '@/api/exchanges.models';
import { RequestState } from 'cryptocaddy/util';

export interface ExchangeTradesState extends RequestState {
  data: ExchangeTrade[],
}

export interface ExchangeWalletsState extends RequestState {
  data: ExchangeWallet[],
}

export interface SupportedExchangeState extends RequestState {
  data: SupportedExchange[];
}

export interface ExchangesState {
  addExchange: RequestState,
  trades: ExchangeTradesState,
  wallets: ExchangeWalletsState,
  supported: SupportedExchangeState,
}
