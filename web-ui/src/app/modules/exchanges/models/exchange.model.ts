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
    (o.exchangeName != null && (typeof o.exchangeName === 'string')) &&
    (o.exchangeKey != null && (typeof o.exchangeKey === 'string')) &&
    (o.exchangeSecret != null && (typeof o.exchangeSecret === 'string')) &&

    // optional
    (o.exchangePass == null || typeof o.exchangePass === 'string');
}
