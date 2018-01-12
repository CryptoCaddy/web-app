package com.cryptocaddy.core.exchanges.bittrex;

import com.cryptocaddy.core.exchanges.Coin;
import com.cryptocaddy.core.exchanges.ExchangeController;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.bittrex.BittrexExchange;
import org.knowm.xchange.dto.account.AccountInfo;


import java.util.ArrayList;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public class BittrexController extends ExchangeController {

    public BittrexController(String key, String secret) {
        super(key, secret);
    }

    protected Exchange getExchange(){
        ExchangeSpecification specification = new ExchangeSpecification(BittrexExchange.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        return ExchangeFactory.INSTANCE.createExchange(specification);
    }


}
