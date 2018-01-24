package com.cryptocaddy.xchange.data.exchanges.binance;

import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import com.cryptocaddy.xchange.data.model.TransactionHistory;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.binance.BinanceExchange;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public class BinanceController extends ExchangeController {

    public BinanceController(String key, String secret) {
        super(key, secret);
    }

    protected Exchange getExchange(){
        ExchangeSpecification specification = new ExchangeSpecification(BinanceExchange.class.getName());
        specification.setApiKey(accountKey);
        specification.setSecretKey(accountSecret);
        return ExchangeFactory.INSTANCE.createExchange(specification);
    }

    //TODO: override inherited function to get trades. Binance wants different info than the rest so we cant fall back on default implementation.
    //nullable return type
    public TransactionHistory getTransactionHistory(){
        TransactionHistory txHistory = null;

        System.out.println("Binance trade history not yet implemented. Needs specific trade pairs in request unlike other exchanges.");

        return txHistory;
    }

}
