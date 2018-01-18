package com.cryptocaddy.core.exchanges.coinbase;

import com.cryptocaddy.core.exchanges.ExchangeController;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.coinbase.CoinbaseExchange;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public class CoinbaseController extends ExchangeController {


    public CoinbaseController(String key, String secret) {
        super(key, secret);
    }

    protected Exchange getExchange(){
        ExchangeSpecification specification = new ExchangeSpecification(CoinbaseExchange.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        return ExchangeFactory.INSTANCE.createExchange(specification);
    }


}
