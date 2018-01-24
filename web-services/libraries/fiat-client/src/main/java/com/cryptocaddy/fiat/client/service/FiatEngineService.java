package com.cryptocaddy.fiat.client.service;

import com.cryptocaddy.fiat.client.entity.FiatCoin;
import com.cryptocaddy.fiat.client.entity.FiatExchange;
import com.cryptocaddy.fiat.client.rest.IFiatEngineRest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

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
    public List<FiatCoin> convertValues(List<FiatCoin> fiatCoins) {
        FiatExchange fiatExchange = fiatEngineRest.lookupFiatValue(new FiatExchange(fiatCoins));
        return fiatExchange != null ? fiatExchange.getFiatCoins() : null;
    }

}
