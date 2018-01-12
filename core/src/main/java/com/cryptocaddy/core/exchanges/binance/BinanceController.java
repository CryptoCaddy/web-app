package com.cryptocaddy.core.exchanges.binance;

import com.cryptocaddy.core.exchanges.ExchangeController;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.binance.BinanceExchange;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public class BinanceController extends ExchangeController {

    public BinanceController(String key, String secret) {
        super(key, secret);
    }

    protected Exchange getExchange(){
        ExchangeSpecification specification = new ExchangeSpecification(BinanceExchange.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        return ExchangeFactory.INSTANCE.createExchange(specification);
    }

}
