import { Wallet } from './wallet.model';

/**
 * Abstract class for wallet coin.  
 * May only be used as interface for properties.
 * Pprovides static heplper methods.
 */
export abstract class WalletCoin {

  id: string;

  walletId: string;
  walletName: string;

  coinName: string;
  coinBalance: number;

  public static fromWallet(wallet: Wallet|Wallet[]): WalletCoin[] {
    if (wallet instanceof Array) {
      return [].concat(...wallet.map((w) => WalletCoin.fromWallet(w)));
    }

    return wallet.coins.map((coin) => ({
      id: `${wallet.walletId}::${coin.currencyCode}`,
      walletId: wallet.walletId,
      walletName: wallet.walletName,
      coinName: coin.displayName,
      coinBalance: coin.available,
    }));
  }

}
