package com.cryptocaddy.xchange.data.exchanges;


import com.cryptocaddy.xchange.data.exchanges.binance.BinanceController;
import com.cryptocaddy.xchange.data.exchanges.bittrex.BittrexController;
import com.cryptocaddy.xchange.data.exchanges.gdax.GdaxController;

import java.util.HashMap;
import java.util.Map;

public class ExchangeControllerBuilder {

    /*
    public static ExchangeController createExchangeController(String exchangeName, String apiKey, String apiSecret, String apiPass){

        //we can surely do this cleaner by mapping enum values to runnable... this is just a quick implementation

        if (exchangeName.equalsIgnoreCase(SupportedExchanges.BINANCE.name()))
            return new BinanceController(apiKey, apiSecret);
        else if (exchangeName.equalsIgnoreCase(SupportedExchanges.BITTREX.name()))
            return new BittrexController(apiKey, apiSecret);
        else if (exchangeName.equalsIgnoreCase(SupportedExchanges.GDAX.name()))
            return new GdaxController(apiKey, apiSecret, apiPass);



        return null;
    }*/

    public static ExchangeController createExchangeController(String exchangeName, String apiKey, String apiSecret, HashMap<String, String> params){

        //we can surely do this cleaner by mapping enum values to runnable... this is just a quick implementation

        if (exchangeName.equalsIgnoreCase(SupportedExchanges.BINANCE.name()))
            return new BinanceController(apiKey, apiSecret, params);
        else if (exchangeName.equalsIgnoreCase(SupportedExchanges.BITTREX.name()))
            return new BittrexController(apiKey, apiSecret, params);
        else if (exchangeName.equalsIgnoreCase(SupportedExchanges.GDAX.name()))
            return new GdaxController(apiKey, apiSecret, params);



        return null;
    }

}
