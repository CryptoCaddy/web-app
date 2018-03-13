package com.cryptocaddy.fiat.client.service;

import com.cryptocaddy.fiat.client.entity.FiatCoin;
import com.cryptocaddy.fiat.client.entity.FiatExchange;
import com.cryptocaddy.fiat.client.rest.IFiatEngineRest;
import com.cryptocaddy.xchange.data.model.Coin;
import com.cryptocaddy.xchange.data.model.TransactionHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@Component
public class FiatEngineService implements IFiatEngineService {
    private final IFiatEngineRest fiatEngineRest;

    @Autowired
    public FiatEngineService(IFiatEngineRest fiatEngineRest) {
        this.fiatEngineRest = fiatEngineRest;
    }

    @Override
    public List<FiatCoin> convertValues(List<Coin> coins, String exchangeName) {
        List<FiatCoin> fiatCoins = convertToFiatCoins(coins, exchangeName);
        FiatExchange fiatExchange = fiatEngineRest.lookupFiatValue(new FiatExchange(fiatCoins));
        return fiatExchange != null ? fiatExchange.getFiatCoins() : null;
    }

    private List<FiatCoin> convertToFiatCoins(List<Coin> coins, String exchangeName) {
        if (coins == null || exchangeName == null) {
            return new ArrayList<>();
        }
        
        //create and return the list of FiatCoins
        return coins.stream()
                .map(coin -> new FiatCoin(exchangeName,
                        coin.getCurrencyCode(),
                        // TODO: this next line is wrong - this needs to be the fiat code to convert to (i.e. USD or EUR etc)
                        "USD",
                        new Date().toString(),
                        coin.getAvailable().toString()))
                .collect(Collectors.toList());
    }

    /*
    private List<FiatCoin> requestCoinValueConversions(TransactionHistory txHistory) {
        if (txHistory == null) {
            return new ArrayList<>();
        }

        //create and return the list of FiatCoins
        return coins.stream()
                .map(coin -> new FiatCoin(exchangeName,
                        coin.getCurrencyCode(),
                        // TODO: this next line is wrong - this needs to be the fiat code to convert to (i.e. USD or EUR etc)
                        coin.getBackingCurrency().getCurrencyCode(),
                        new Date().toString(),
                        coin.getAvailable().toString()))
                .collect(Collectors.toList());
    }*/

}
