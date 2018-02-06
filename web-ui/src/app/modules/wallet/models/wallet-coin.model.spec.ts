import { Wallet } from './wallet.model';
import { WalletCoin } from './wallet-coin.model';

describe('WalletCoin', () => {
  describe('::fromWallet', () => {
    const wallet1: Wallet = {
      walletId: '1',
      walletName: 'Wallet 1',
      coins: [ {
          available: 100.00,
          availableForWithdrawal: 100.00,
          currencyCode: 'BTC',
          depositing: 25.00,
          displayName: 'Bitcoin',
          symbol: 'BTC',
          totalQuantity: 150.00,
          withdrawing: 50.00,
      }, {
          available: 500.00,
          availableForWithdrawal: 500.00,
          currencyCode: 'ETH',
          depositing: 125.00,
          displayName: 'Ethereum',
          symbol: 'ETH',
          totalQuantity: 750.00,
          withdrawing: 250.00,
      } ],
    };

    const wallet2: Wallet = {
      walletId: '2',
      walletName: 'Wallet 2',
      coins: [ {
          available: 200.00,
          availableForWithdrawal: 200.00,
          currencyCode: 'BTC',
          depositing: 50.00,
          displayName: 'Bitcoin',
          symbol: 'BTC',
          totalQuantity: 300.00,
          withdrawing: 100.00,
      }, {
          available: 1000.00,
          availableForWithdrawal: 1000.00,
          currencyCode: 'ETH',
          depositing: 250.00,
          displayName: 'Ethereum',
          symbol: 'ETH',
          totalQuantity: 1500.00,
          withdrawing: 500.00,
      } ],
    };

    it('should split a given Wallet into its WalletCoins', () => {
      expect(WalletCoin.fromWallet(wallet1)).toEqual([
        { id: '1::BTC', walletId: '1', walletName: 'Wallet 1', coinName: 'Bitcoin', coinBalance: 100 },
        { id: '1::ETH', walletId: '1', walletName: 'Wallet 1', coinName: 'Ethereum', coinBalance: 500 },
      ]);
    });

    it('should split multiple given Wallets into their WalletCoins', () => {
      expect(WalletCoin.fromWallet([ wallet1, wallet2 ])).toEqual([
        { id: '1::BTC', walletId: '1', walletName: 'Wallet 1', coinName: 'Bitcoin', coinBalance: 100 },
        { id: '1::ETH', walletId: '1', walletName: 'Wallet 1', coinName: 'Ethereum', coinBalance: 500 },
        { id: '2::BTC', walletId: '2', walletName: 'Wallet 2', coinName: 'Bitcoin', coinBalance: 200 },
        { id: '2::ETH', walletId: '2', walletName: 'Wallet 2', coinName: 'Ethereum', coinBalance: 1000 },
      ]);
    });
  });

});
