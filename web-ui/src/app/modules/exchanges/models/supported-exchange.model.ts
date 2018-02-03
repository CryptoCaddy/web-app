export interface SupportedExchangeParameter {
  parameter: string;
  type: 'string'|'number';
}

export interface SupportedExchange {
  exchangeName: string;
  parameterList: SupportedExchangeParameter[];
}

export function isSupportedExchange(o: any): o is SupportedExchange {
  return o != null
    && typeof o.exchangeName === 'string'
    && typeof o.parameterList === 'object';
}
