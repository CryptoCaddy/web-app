package com.cryptocaddy.fiat.client.service;

import com.cryptocaddy.fiat.client.entity.FiatResult;
import com.cryptocaddy.fiat.client.rest.IFiatEngineRest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Date;

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
    public BigDecimal convertValues(String exchange, String cryptoCurrency, String fiatCurrency, Date date) {
        FiatResult fiatResult = fiatEngineRest.lookupFiatValue(exchange, cryptoCurrency, fiatCurrency, date);
        return fiatResult != null ? new BigDecimal(fiatResult.getValue()) : BigDecimal.ZERO;
    }

}
