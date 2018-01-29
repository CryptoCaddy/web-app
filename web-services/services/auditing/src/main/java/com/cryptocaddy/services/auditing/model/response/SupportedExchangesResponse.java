package com.cryptocaddy.services.auditing.model.response;

import com.cryptocaddy.xchange.data.model.ParameterList;

import java.util.*;

public class SupportedExchangesResponse {

    private Map<String, ParameterList<String, String>> exchangeToParameterMap;

    public SupportedExchangesResponse() {
        exchangeToParameterMap = new HashMap<>();
    }

    public Map<String, ParameterList<String, String>> getExchangeToParameterMap() {
        return exchangeToParameterMap;
    }

    public void addSupportedExchange(String exchangeName, ParameterList<String, String> requiredParameters){
        exchangeToParameterMap.put(exchangeName, requiredParameters);
    }

}
