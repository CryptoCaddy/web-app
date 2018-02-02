export interface Exchange {
  exchangeId: number;
  exchangeName: string;
  parameters: {
    [key: string]: string|number;
  };
}

// export function computeExchangeFields(exchange: Exchange): Exchange {
//   return Object.assign(
//     { },
//     exchange,
//     {
//       isStored: !!exchange.exchangeKey && !!exchange.exchangeSecret,
//     } as Partial<Exchange>,
//   );
// }

export function isExchange(o: Exchange): o is Exchange {
  return o != null &&
    (typeof o === 'object') &&

    // required
    typeof o.exchangeId === 'number' &&
    typeof o.exchangeName === 'string' &&
    typeof o.parameters === 'object'

    // optional
    ;
}
