import { exchangeMetaMappings } from '@/api/exchanges-meta';
import axios from 'axios';

import {
  ExchangeAddRequest,
  ExchangeIdType,
  ExchangeToParameterMap,
  ExchangeWallet,
  ExchangeWalletsResponse,
  SupportedExchange,
  SupportedExchangeResponse,
} from './exchanges.models';

async function exchangeMapToArray(
  exchangeMap: ExchangeToParameterMap,
): Promise<SupportedExchange[]> {
  if (!exchangeMap) {
    return Promise.reject(new Error('Data could not be loaded.'));
  }

  return Object.entries(exchangeMap).map(([key, value]) => ({ ...value, key }));
}

function getNormalizeWallet(exchange: ExchangeWallet): ExchangeWallet {
  return {
    ...exchange,
    exchangeCoins: exchange.exchangeCoins || [],
    txHistory: exchange.txHistory || [],
  };
}

/** Get exchange extended with meta taken from mappigns in `exchangeMetaMappings`. */
function getExchangeWithMeta(exchange: ExchangeWallet): ExchangeWallet {
  return {
    ...exchange,
    meta: exchangeMetaMappings[exchange.exchangeName],
  };
}

export const ExchangesApi = {

  addExchange(exchangeToAdd: ExchangeAddRequest): Promise<ExchangeWallet> {
    return axios.post<ExchangeWallet>('/api/user-exchange/add', exchangeToAdd)
      .then((res) => res.data)
      .then((data) => getNormalizeWallet(data))
      .then((data) => getExchangeWithMeta(data));
  },

  getSupportedExchanges(): Promise<SupportedExchange[]> {
    return axios.get<SupportedExchangeResponse>('/api/exchanges/supported')
      .then((res) => res.data)
      .then((data) => exchangeMapToArray(data.exchangeToParameterMap));
  },

  getWallets(): Promise<ExchangeWallet[]> {
    return axios.get<ExchangeWalletsResponse>('/api/user-exchange/wallets')
      .then((res) => res.data.allExchangeWrappers)
      .then((data) => data.map(getNormalizeWallet))
      .then((data) => data.map(getExchangeWithMeta));
  },

  removeExchange(exchangeIdRemove: ExchangeIdType): Promise<any> {
    // @TODO send as payload instead of query parameter
    return axios.post('/api/user-exchange/remove', { }, { params: { exchangeIdRemove } });
  },

};
