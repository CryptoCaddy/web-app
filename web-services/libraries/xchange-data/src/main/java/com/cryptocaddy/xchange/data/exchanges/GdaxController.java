package com.cryptocaddy.xchange.data.exchanges;

import org.knowm.xchange.gdax.GDAXExchange;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
@Component
public class GdaxController extends ExchangeController {

    /*

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

    */



    //private String accountPass; //gdax specific


    /**
     * Additional parameters on top of key and secret that are required to get user exchange data.
     * GDAX requires a password.
     * @return list of names of required parameters other than key and secret
     */
//    public List<String> requiredAdditionalParameters(){
//        List<String> parameters = super.requiredAdditionalParameters();
//        parameters.add("passphrase");
//        return parameters;
//    }

/*
    protected Exchange getExchange(){
        ExchangeSpecification specification = new ExchangeSpecification(GDAXExchange.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        specification.setExchangeSpecificParametersItem("passphrase", accountPass);
        return ExchangeFactory.INSTANCE.createExchange(specification);
    }*/





}
