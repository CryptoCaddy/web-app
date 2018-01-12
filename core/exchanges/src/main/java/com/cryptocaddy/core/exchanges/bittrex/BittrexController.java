package com.cryptocaddy.core.exchanges.bittrex;

import com.cryptocaddy.core.exchanges.Coin;
import com.cryptocaddy.core.exchanges.ExchangeController;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
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
        //TODO: uncomment and fix once maven build is fixed
/*
        ExchangeSpecification specification = new ExchangeSpecification(FFFIIIIXXXXXX.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        return ExchangeFactory.INSTANCE.createExchange(specification);
        */

return null;
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
