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
