package com.cryptocaddy.core.exchanges;


import com.cryptocaddy.core.exchanges.binance.BinanceController;
import com.cryptocaddy.core.exchanges.bittrex.BittrexController;
import com.cryptocaddy.core.exchanges.gdax.GdaxController;

public class ExchangeControllerBuilder {

    public static ExchangeController createExchangeController(String exchangeName, String apiKey, String apiSecret, String apiPass){

        if (exchangeName.equalsIgnoreCase(SupportedExchanges.BINANCE.name()))
            return new BinanceController(apiKey, apiSecret);
        else if (exchangeName.equalsIgnoreCase(SupportedExchanges.BITTREX.name()))
            return new BittrexController(apiKey, apiSecret);
        else if (exchangeName.equalsIgnoreCase(SupportedExchanges.GDAX.name()))
            return new GdaxController(apiKey, apiSecret, apiPass);



        return null;
    }


}
