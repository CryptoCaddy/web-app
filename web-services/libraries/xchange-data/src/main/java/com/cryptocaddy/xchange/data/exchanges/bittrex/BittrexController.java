package com.cryptocaddy.xchange.data.exchanges.bittrex;

import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.bittrex.BittrexExchange;
import org.knowm.xchange.gdax.GDAXExchange;

import java.util.HashMap;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public class BittrexController extends ExchangeController {

    public BittrexController(String key, String secret, HashMap<String, String> additionalParameters){
        super(key, secret, additionalParameters);
        this.xchangeClassName = BittrexExchange.class.getName();
    }


    /*
    protected Exchange getExchange(){
        ExchangeSpecification specification = new ExchangeSpecification(BittrexExchange.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        return ExchangeFactory.INSTANCE.createExchange(specification);
    }*/


}
