package com.cryptocaddy.core.exchanges.gdax;

import com.cryptocaddy.core.exchanges.Coin;
import com.cryptocaddy.core.exchanges.ExchangeController;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.dto.account.AccountInfo;
import org.knowm.xchange.gdax.GDAXExchange;
import org.knowm.xchange.service.account.AccountService;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public class GdaxController extends ExchangeController  {

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


    public ArrayList<Coin> getAllCoins(){
        ArrayList<Coin> coinList = new ArrayList<>();

        AccountInfo accountInfo = getAccountInfo();
        if(accountInfo == null){
            return coinList;
        }

        //TODO: convert the coins in the json array to coin objects and add to coinList


        return coinList;
    }


}
