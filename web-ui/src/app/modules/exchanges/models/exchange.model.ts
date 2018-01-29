export interface Exchange {
  exchangeName: string;
  exchangeKey: string;
  exchangeSecret: string;
  exchangePass?: string;

  isStored?: boolean;
}

export function computeExchangeFields(exchange: Exchange): Exchange {
  return Object.assign(
    { },
    exchange,
    {
      isStored: !!exchange.exchangeKey && !!exchange.exchangeSecret,
    } as Partial<Exchange>,
  );
}

export function isExchange(o: Exchange): o is Exchange {
  return o != null &&
    (typeof o === 'object') &&

    // required
    typeof o.exchangeName === 'string' &&
    typeof o.exchangeKey === 'string' &&
    typeof o.exchangeSecret === 'string' &&

    // optional
    (o.exchangePass == null || typeof o.exchangePass === 'string');
}
