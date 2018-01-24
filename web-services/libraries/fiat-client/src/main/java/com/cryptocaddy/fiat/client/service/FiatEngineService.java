package com.cryptocaddy.fiat.client.service;

import com.cryptocaddy.fiat.client.rest.IFiatEngineRest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@Component
public class FiatEngineService implements IFiatEngineService {
    private final IFiatEngineRest fiatEngineRest;

    @Autowired
    public FiatEngineService(IFiatEngineRest fiatEngineRest) {
        this.fiatEngineRest = fiatEngineRest;
    }

    @Override
    public Object convertValues() {
        return fiatEngineRest.lookupFiatValue();
    }

}
