package com.cryptocaddy.xchange.data.exchanges;

import com.cryptocaddy.xchange.data.model.TransactionHistory;
import org.knowm.xchange.binance.BinanceExchange;
import org.springframework.stereotype.Component;

import java.util.HashMap;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
@Component
public class BinanceController extends ExchangeController {

    protected String getWrappedXchangeName(){
        return BinanceExchange.class.getName();
    }

    //TODO: override inherited function to get trades. Binance wants different info than the rest so we cant fall back on default implementation.
    //nullable return type
    @Override
    public TransactionHistory getTransactionHistory(String key, String secret, HashMap<String, String> additionalParameters){
        TransactionHistory txHistory = null;

        System.out.println("Binance trade history not yet implemented. Needs specific trade pairs in request unlike other exchanges.");

        return txHistory;
    }

}
