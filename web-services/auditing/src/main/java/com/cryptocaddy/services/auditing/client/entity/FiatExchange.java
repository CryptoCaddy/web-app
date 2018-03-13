package com.cryptocaddy.services.auditing.client.entity;

import java.util.List;

public class FiatExchange {
    private List<FiatCoin> fiatCoins;

    public FiatExchange() {}

    public FiatExchange(List<FiatCoin> fiatCoins) {
        this.fiatCoins = fiatCoins;
    }

    public List<FiatCoin> getFiatCoins() {
        return fiatCoins;
    }

    public void setFiatCoins(List<FiatCoin> fiatCoins) {
        this.fiatCoins = fiatCoins;
    }

}
