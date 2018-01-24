package com.cryptocaddy.xchange.data.exchanges.gdax;

import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.gdax.GDAXExchange;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public class GdaxController extends ExchangeController {

    private String accountPass; //gdax specific

    public GdaxController(String key, String secret, String pass) {
        super(key, secret);
        accountPass = pass;
    }

    protected Exchange getExchange(){
        ExchangeSpecification specification = new ExchangeSpecification(GDAXExchange.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        specification.setExchangeSpecificParametersItem("passphrase", accountPass);
        return ExchangeFactory.INSTANCE.createExchange(specification);
    }





}
