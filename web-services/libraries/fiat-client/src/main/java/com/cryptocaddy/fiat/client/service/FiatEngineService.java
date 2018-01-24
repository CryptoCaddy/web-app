package com.cryptocaddy.fiat.client.service;

import com.cryptocaddy.fiat.client.entity.FiatCoin;
import com.cryptocaddy.fiat.client.entity.FiatExchange;
import com.cryptocaddy.fiat.client.rest.IFiatEngineRest;
import com.cryptocaddy.xchange.data.model.Coin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
        List<FiatCoin> fiatCoins = new ArrayList<>();

        // TODO: 1/23/2018 - implement this logic to go from list of coins to the list of fiat coins needed
        //coins.forEach(coin -> coin.get);

        fiatCoins.add(new FiatCoin("Binance", "VEN", "BTC", new Date().toString(), "100"));

        return fiatCoins;
    }

}
