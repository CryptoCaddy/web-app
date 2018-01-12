package com.cryptocaddy.services.auditing.resource.model;

import com.cryptocaddy.core.exchanges.Coin;
import org.knowm.xchange.dto.account.AccountInfo;

import java.io.Serializable;
import java.util.ArrayList;

public class AuditReport implements Serializable {
    ArrayList<Coin> coins;

    public AuditReport() {

    }

    public AuditReport(ArrayList<Coin> coins) {
        //testing exchange api calls with hard-coded data. remove if found
        this.coins = coins;
    }

    public ArrayList<Coin> getCoins() {
        return coins;
    }

    public void setCoins(ArrayList<Coin> coins) {
        this.coins = coins;
    }

}
