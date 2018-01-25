package com.cryptocaddy.xchange.data.exchanges.coinbase;

import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.coinbase.CoinbaseExchange;

import java.util.HashMap;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public class CoinbaseController extends ExchangeController {

/*
    public CoinbaseController(String key, String secret) {
        super(key, secret);
    }*/

    public CoinbaseController(String key, String secret, HashMap<String, String> additionalParameters){
        super(key, secret, additionalParameters);
        this.xchangeClassName = CoinbaseController.class.getName();
    }

    /*
    protected Exchange getExchange(){
        ExchangeSpecification specification = new ExchangeSpecification(CoinbaseExchange.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        return ExchangeFactory.INSTANCE.createExchange(specification);
    }*/


}
