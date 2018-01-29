package com.cryptocaddy.services.auditing.model;

import com.cryptocaddy.fiat.client.entity.FiatCoin;
import com.cryptocaddy.xchange.data.model.Coin;

import java.io.Serializable;
import java.util.List;

public class AuditReport implements Serializable{
    List<Coin> coins;

    public AuditReport() {

    }

    public AuditReport(List<Coin> coins) {
        this.coins = coins;
    }

    public List<Coin> getCoins() {
        return coins;
    }

    public void setCoins(List<Coin> coins) {
        this.coins = coins;
    }

}
