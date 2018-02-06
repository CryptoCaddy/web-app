import { Coin } from './coin';

export interface Wallet {

  /** Identifier of the wallet. */
  walletId: string;

  /** Name of the wallet. */
  walletName: string;

  /** Balance of the wallet as single {@link Coin} objects. */
  coins: Coin[];
}

export function isWallet(o: any): o is Wallet {
  return o != null &&

    // required
    typeof o.walletId === 'string' &&
    typeof o.walletName === 'string' &&

    // optional
    typeof o.coins === 'object'
    ;
}
