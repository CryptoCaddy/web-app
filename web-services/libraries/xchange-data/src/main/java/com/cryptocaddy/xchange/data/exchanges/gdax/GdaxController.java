package com.cryptocaddy.xchange.data.exchanges.gdax;

import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.gdax.GDAXExchange;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
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

    public GdaxController(String key, String secret, HashMap<String, String> additionalParameters){
        super(key, secret, additionalParameters);
        this.xchangeClassName = GDAXExchange.class.getName();
    }

    /**
     * Additional parameters on top of key and secret that are required to get user exchange data.
     * GDAX requires a password.
     * @return list of names of required parameters other than key and secret
     */
    public List<String> requiredAdditionalParameters(){
        List<String> parameters = super.requiredAdditionalParameters();
        parameters.add("passphrase");
        return parameters;
    }

/*
    protected Exchange getExchange(){
        ExchangeSpecification specification = new ExchangeSpecification(GDAXExchange.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        specification.setExchangeSpecificParametersItem("passphrase", accountPass);
        return ExchangeFactory.INSTANCE.createExchange(specification);
    }*/





}
