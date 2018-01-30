package com.cryptocaddy.services.auditing.model.response;

import java.util.ArrayList;
import java.util.List;

public class UserDataResponse {

    private List<ExchangeWrapperResponse> allExchangeWrappers;

    public UserDataResponse() {
        allExchangeWrappers = new ArrayList<>();
    }

    public List<ExchangeWrapperResponse> getAllExchangeWrappers() {
        return allExchangeWrappers;
    }

    public void setAllExchangeWrappers(List<ExchangeWrapperResponse> allExchangeWrappers) {
        this.allExchangeWrappers = allExchangeWrappers;
    }

    public void addExchangeWrapper(ExchangeWrapperResponse exchangeWrapperResponse){
        allExchangeWrappers.add(exchangeWrapperResponse);
    }
}
