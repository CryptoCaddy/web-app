package com.cryptocaddy.services.auditing.client.rest;

import com.cryptocaddy.services.auditing.client.entity.FiatExchange;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
public interface IFiatEngineRest {

    FiatExchange lookupFiatValue(FiatExchange fiatExchange);

}
