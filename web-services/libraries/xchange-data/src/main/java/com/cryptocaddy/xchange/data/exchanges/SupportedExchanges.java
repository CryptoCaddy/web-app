package com.cryptocaddy.xchange.data.exchanges;

public enum SupportedExchanges {

    BITTREX,
    BINANCE,
    GDAX

}

/*
import com.cryptocaddy.xchange.data.exchanges.binance.BinanceController;
import com.cryptocaddy.xchange.data.exchanges.bittrex.BittrexController;
import com.cryptocaddy.xchange.data.exchanges.gdax.GdaxController;

import java.util.Dictionary;
import java.util.HashMap;
import java.util.Map;

public class SupportedExchanges {

    public enum Names {
        BITTREX,
        BINANCE,
        GDAX
    }



    private static final Map<Names, Class<? extends ExchangeController>> namesExchangeControllerMap = createMap();
    private static Map<Names, Class<? extends ExchangeController>> createMap()
    {
        Map<Names, Class<? extends ExchangeController>> myMap = new HashMap<>();
        myMap.put(Names.BITTREX, BittrexController.class);
        myMap.put(Names.BINANCE, BinanceController.class);
        myMap.put(Names.GDAX, GdaxController.class);
        return myMap;
    }


    public static ExchangeController createExchangeController(String exchangeName, String apiKey, String apiSecret, Map<String, String>parameters){


        Names name = Names.valueOf(exchangeName.toUpperCase());

        if (namesExchangeControllerMap.containsKey(name)){
            Class<? extends ExchangeController> exchangeClassType = namesExchangeControllerMap.get(name);
            ExchangeController x = exchangeClassType.newInstance(apiKey, apiSecret, parameters);
        }

    }






}
*/
