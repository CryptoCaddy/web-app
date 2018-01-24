package com.cryptocaddy.fiat.client.rest;

import com.cryptocaddy.fiat.client.entity.FiatResult;

import java.util.Date;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
public interface IFiatEngineRest {

    FiatResult lookupFiatValue(String exchange, String cryptoCurrency, String fiatCurrency, Date date);

}
