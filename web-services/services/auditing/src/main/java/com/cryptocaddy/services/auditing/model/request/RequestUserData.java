package com.cryptocaddy.services.auditing.model.request;

import java.util.List;

public class RequestUserData {

    public boolean requestExchangeWallets;
    public List<String> limitExchangeWallets;

    public boolean requestExchangeTrades;
    public List<String> limitExchangeTrades;

    public RequestUserData() {

    }

}
