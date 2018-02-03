package com.cryptocaddy.services.auditing.model.response;

import java.util.ArrayList;
import java.util.List;

public class ResponseUserData {

    private List<ResponseExchangeWrapper> allExchangeWrappers;

    public ResponseUserData() {
        allExchangeWrappers = new ArrayList<>();
    }

    public List<ResponseExchangeWrapper> getAllExchangeWrappers() {
        return allExchangeWrappers;
    }

    public void setAllExchangeWrappers(List<ResponseExchangeWrapper> allExchangeWrappers) {
        this.allExchangeWrappers = allExchangeWrappers;
    }

    public void addExchangeWrapper(ResponseExchangeWrapper responseExchangeWrapper){
        allExchangeWrappers.add(responseExchangeWrapper);
    }
}
