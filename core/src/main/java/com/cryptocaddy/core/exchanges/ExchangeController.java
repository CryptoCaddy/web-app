package com.cryptocaddy.core.exchanges;

import org.knowm.xchange.Exchange;
import org.knowm.xchange.currency.Currency;
import org.knowm.xchange.dto.account.AccountInfo;
import org.knowm.xchange.dto.account.Balance;
import org.knowm.xchange.dto.account.Wallet;
import org.knowm.xchange.service.account.AccountService;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public abstract class ExchangeController {
    protected String accountKey;
    protected String accountSecret;

    public ExchangeController(String key, String secret){
        accountKey = key;
        accountSecret = secret;
    }

    protected abstract Exchange getExchange();

    //nullable return type
    public AccountInfo getAccountInfo() {
        AccountService accountService = getExchange().getAccountService();
        AccountInfo accountInfo = null;

        try{
            accountInfo = accountService.getAccountInfo();
            //TODO: place in #if debug preprocessor or equivalent
            System.out.println(String.format("%s AccountInfo: %s",this.getClass().getName(),accountInfo.toString()));
        }catch(IOException e){
            e.printStackTrace();
        }

        return accountInfo;
    }

    public ArrayList<Coin> getAllCoins(){
        ArrayList<Coin> coinList = new ArrayList<>();

        AccountInfo accountInfo = getAccountInfo();
        if(accountInfo == null){
            return coinList;
        }


        Map<String, Wallet> stringWalletMap = accountInfo.getWallets();
        for (Map.Entry<String, Wallet> walletEntry : stringWalletMap.entrySet())
        {
            Wallet wallet = walletEntry.getValue();
            Map<Currency, Balance> currencyBalanceMap = wallet.getBalances();
            for (Map.Entry<Currency, Balance> entry : currencyBalanceMap.entrySet())
            {
                Balance balance = entry.getValue();
                if (balance.getTotal() == BigDecimal.ZERO){
                    continue;
                }

                Currency currency = entry.getKey();
                Coin thisCoin = new Coin(currency, balance);
                coinList.add(thisCoin);

                //TODO: place in #if debug preprocessor or equivalent
                System.out.println(entry.getKey() + "/" + entry.getValue());
            }
        }


        return coinList;
    }

}
