import { exchangeMetaMappings } from '@/api/exchanges-meta';
import axios, { AxiosError } from 'axios';

import {
  ExchangeAddRequest,
  ExchangeToParameterMap,
  ExchangeWallet,
  ExchangeWalletsResponse,
  SupportedExchange,
  SupportedExchangeResponse,
} from './exchanges.models';

async function exchangeMapToArray(
  exchangeMap: ExchangeToParameterMap | null,
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
    return new Promise((resolve, reject) => {
      axios.post('/api/addExchange', exchangeToAdd)
        .then((res) => res.data)
        .then((data) => getNormalizeWallet(data))
        .then((data) => getExchangeWithMeta(data))
        .then((data) => resolve(data))
        .catch((err: AxiosError) => {
          reject(new Error(err.message));
        });
    });
  },

  getSupportedExchanges(): Promise<SupportedExchange[]> {
    return new Promise((resolve, reject) => {
      axios.get('/api/supportedExchanges')
        .then((res) => res.data as SupportedExchangeResponse)
        .then((data) => resolve(exchangeMapToArray(data.exchangeToParameterMap)))
        .catch((err: AxiosError) => {
          reject(new Error(err.message));
        });
    });
  },

  getWallets(): Promise<ExchangeWallet[]> {
    return new Promise((resolve, reject) => {
      axios.get<ExchangeWalletsResponse>('/api/exchangeWallets')
        .then((res) => res.data.allExchangeWrappers)
        .then((data) => data.map(getNormalizeWallet))
        .then((data) => data.map(getExchangeWithMeta))
        .then((data) => resolve(data))
        .catch((err: AxiosError) => {
          reject(new Error(err.message));
        });
    });
  },

};
