package com.cryptocaddy.xchange.data.exchanges;

import com.cryptocaddy.xchange.data.model.Coin;
import com.cryptocaddy.xchange.data.model.Transaction;
import com.cryptocaddy.xchange.data.model.TransactionHistory;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.currency.Currency;
import org.knowm.xchange.dto.account.AccountInfo;
import org.knowm.xchange.dto.account.Balance;
import org.knowm.xchange.dto.account.Wallet;
import org.knowm.xchange.dto.trade.UserTrade;
import org.knowm.xchange.dto.trade.UserTrades;
import org.knowm.xchange.service.account.AccountService;
import org.knowm.xchange.service.trade.TradeService;
import org.knowm.xchange.service.trade.params.TradeHistoryParams;
import org.knowm.xchange.service.trade.params.TradeHistoryParamsAll;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public abstract class ExchangeController implements IExchangeController {
    /**
     * Override this in subclasses for exchanges that need more data than just account key and secret for api calls
     * @return exchange specification used to create the exchange.
     */
    @Override
    public ExchangeSpecification getXchangeSpecification(String exchangeName, String exchangeKey, String exchangeSecret,
                                                         HashMap<String, String> params){

        ExchangeSpecification specification = new ExchangeSpecification(this.getClass().getName());
        specification.setApiKey(exchangeKey);
        specification.setSecretKey(exchangeSecret);

        //for each parameter that we need in addition to key and secret, ensure we were provided a value, and assign it.
        if (params != null){
            for (String parameterKey : params.keySet()) {
                String parameterValue = params.get(parameterKey);
                if (parameterValue == null){
                    System.out.println(parameterKey + "was not specified for exchange specification: " + exchangeName);
                    parameterValue = "";
                }

                specification.setExchangeSpecificParametersItem(parameterKey, parameterValue);
            }
        }


        return specification;
    }

    /**
     * Get the object used to actually call the APIs for each exchange
     * @return -
     */
    @Override
    public Exchange getExchange(String exchangeName, String exchangeKey, String exchangeSecret,
                                HashMap<String, String> params){

        return ExchangeFactory.INSTANCE.createExchange(getXchangeSpecification(exchangeName, exchangeKey, exchangeSecret, params));
    }
    //protected abstract Exchange getExchange();


    //nullable return type
    @Override
    public AccountInfo getAccountInfo(String exchangeName, String exchangeKey, String exchangeSecret,
                                      HashMap<String, String> params) {

        AccountService accountService = getExchange(exchangeName, exchangeKey, exchangeSecret, params).getAccountService();

        AccountInfo accountInfo = null;

        try{
            accountInfo = accountService.getAccountInfo();
            //TODO: place in #if debug preprocessor or equivalent
            System.out.println(String.format("%s AccountInfo: %s",this.getClass().getName(),accountInfo.toString()));
        }catch(IOException e){
            e.printStackTrace();
        }

        return accountInfo;
    }

    //returns a list of all coins in the exchange with balance data
    @Override
    public List<Coin> getAllCoins(String exchangeName, String exchangeKey, String exchangeSecret,
                                  HashMap<String, String> params){

        List<Coin> coinList = new ArrayList<>();

        AccountInfo accountInfo = getAccountInfo(exchangeName, exchangeKey, exchangeSecret, params);
        if(accountInfo == null){
            return coinList;
        }


        Map<String, Wallet> stringWalletMap = accountInfo.getWallets();
        for (Map.Entry<String, Wallet> walletEntry : stringWalletMap.entrySet())
        {
            Wallet wallet = walletEntry.getValue();
            Map<Currency, Balance> currencyBalanceMap = wallet.getBalances();
            for (Map.Entry<Currency, Balance> entry : currencyBalanceMap.entrySet())
            {
                Balance balance = entry.getValue();
                BigDecimal zero = new BigDecimal("0E-8");
                if (balance.getTotal() == BigDecimal.ZERO || balance.getTotal().compareTo(zero) == 0){
                    continue;
                }

                Currency currency = entry.getKey();
                Coin thisCoin = new Coin(currency, balance);
                coinList.add(thisCoin);

                //TODO: place in #if debug preprocessor or equivalent
                System.out.println(entry.getKey() + "/" + entry.getValue());
            }
        }


        return coinList;
    }


    //nullable return type
    @Override
    public TransactionHistory getTransactionHistory(String exchangeName, String exchangeKey, String exchangeSecret,
                                                    HashMap<String, String> params){

        TransactionHistory txHistory = null;

        Exchange exchange = getExchange(exchangeName, exchangeKey, exchangeSecret, params);
        TradeService tradeService = exchange.getTradeService();
        //TODO: set end date to end of tax year in params before getting trades or accept start / end dates
        TradeHistoryParams tradeHistoryParams = new TradeHistoryParamsAll();
        try {
            UserTrades tradeHistory = tradeService.getTradeHistory(tradeHistoryParams);
            //TODO: place in #if debug preprocessor or equivalent
            System.out.println(tradeHistory.toString());

            txHistory = new TransactionHistory();
            for (UserTrade userTrade : tradeHistory.getUserTrades()){
                Transaction tx = new Transaction(userTrade);
                txHistory.addTransaction(tx);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return txHistory;
    }

    public void getReport(){
        /* NOT FULLY IMPLEMENTED
        //TODO: account for actual date zones when this gets implemented for real
        LocalDateTime startDateTime = LocalDateTime.of(2017, Month.JANUARY, 1,0,0);
        ZonedDateTime startZoneDate = startDateTime.atZone(ZoneId.systemDefault());
        Date startDate = Date.from(startZoneDate.toInstant());

        LocalDateTime endDateTime = LocalDateTime.of(2017, Month.DECEMBER, 31, 23, 59, 59);
        ZonedDateTime endZoneDate = endDateTime.atZone(ZoneId.systemDefault());
        Date endDate = Date.from(endZoneDate.toInstant());

        GDAX.GDAXReportRequest reportRequest = new GDAX.GDAXReportRequest(GDAX.GDAXReportRequest.Type.fills,startDate, endDate, ......);
        */
    }

}
