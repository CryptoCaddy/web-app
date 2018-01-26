package com.cryptocaddy.xchange.data.exchanges;

import org.knowm.xchange.bittrex.BittrexExchange;
import org.springframework.stereotype.Component;

import java.util.HashMap;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
@Component
public class BittrexController extends ExchangeController {
    /*
    protected Exchange getExchange(){
        ExchangeSpecification specification = new ExchangeSpecification(BittrexExchange.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        return ExchangeFactory.INSTANCE.createExchange(specification);
    }*/


}
