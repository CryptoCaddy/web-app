package com.cryptocaddy.services.auditing.exchanges.controller;

import org.knowm.xchange.coinbase.CoinbaseExchange;
import org.springframework.stereotype.Component;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
@Component
public class CoinbaseController extends ExchangeController {

    protected String getWrappedXchangeName(){
        return CoinbaseExchange.class.getName();
    }


}
