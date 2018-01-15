package com.cryptocaddy.services.auditing.resource.model;

import com.cryptocaddy.core.exchanges.Coin;
import org.knowm.xchange.dto.account.AccountInfo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class AuditReport implements Serializable {
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
