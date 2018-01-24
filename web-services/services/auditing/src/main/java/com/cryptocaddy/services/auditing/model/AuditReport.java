package com.cryptocaddy.services.auditing.model;

import com.cryptocaddy.fiat.client.entity.FiatCoin;
import com.cryptocaddy.xchange.data.model.Coin;

import java.io.Serializable;
import java.util.List;

public class AuditReport implements Serializable {
    List<Coin> coins;
    List<FiatCoin> fiatCoins;

    public AuditReport() {

    }

    public AuditReport(List<Coin> coins, List<FiatCoin> fiatCoins) {
        this.coins = coins;
        this.fiatCoins = fiatCoins;
    }

    public List<Coin> getCoins() {
        return coins;
    }

    public void setCoins(List<Coin> coins) {
        this.coins = coins;
    }

    public List<FiatCoin> getFiatCoins() {
        return fiatCoins;
    }

    public void setFiatCoins(List<FiatCoin> fiatCoins) {
        this.fiatCoins = fiatCoins;
    }
}
