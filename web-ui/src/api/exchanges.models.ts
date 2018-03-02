import { ExchangeMetaInformation } from '@/api/exchanges-meta';

export type ExchangeIdType = number;

export interface ExchangeAddRequest {
  exchangeName: string;
  parameters: ExchangeApiCredentials;
}

export interface ExchangeApiCredentials {
  [key: string]: string
}

export interface ExchangeTrade {
  key: string;
}

export interface SupportedExchangeResponse {
  exchangeToParameterMap: ExchangeToParameterMap;
}

export interface ExchangeToParameterMap {
  /** Array of the supported exchanges. */
  [key: string]: SupportedExchange;
}

export interface SupportedExchange {
  /**
   * The exchanges key.
   * Note: Property not part of the response. Must be set before proceeding.
   * */
  key: string;

  /** Array of the exchanges credential parameters. */
  parameterList: ParameterItem[];
}

export interface ParameterItem {
  /** The parameters name. */
  parameter: string;

  /** The parameters data type (e.g. 'string', 'number'). */
  type: string;
}

export interface ExchangeWalletsResponse {
  allExchangeWrappers: ExchangeWallet[];
}

export interface ExchangeWallet {
  exchangeCoins?: ExchangeCoin[];
  exchangeEntryId: ExchangeIdType;
  exchangeName: string;
  txHistory?: any[];

  /** Meta information added in the UI loading. */
  meta?: ExchangeMetaInformation;
}

export interface ExchangeCoin {
  symbol: string;
  currencyCode: string;
  displayName: string;
  totalQuantity: number;
  available: number;
  availableForWithdrawal: number;
  withdrawing: number;
  depositing: number;
}
