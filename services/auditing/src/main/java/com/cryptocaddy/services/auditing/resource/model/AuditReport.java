package com.cryptocaddy.services.auditing.resource.model;

import com.cryptocaddy.core.exchanges.binance.BinanceController;
import com.cryptocaddy.core.exchanges.gdax.GdaxController;

public class AuditReport {
    private String type;
    private String name;

    public AuditReport() {

        //testing exchange api calls with hard-coded data. remove if found
        TestingSoRemoveIfFound();

    }

    private void TestingSoRemoveIfFound(){

    }

    @SuppressWarnings("unused")
    public String getType() {
        return type;
    }


    public void setType(String type) {
        this.type = type;
    }

    @SuppressWarnings("unused")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
