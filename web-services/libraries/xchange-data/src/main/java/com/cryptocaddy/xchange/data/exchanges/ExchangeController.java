package com.cryptocaddy.xchange.data.exchanges;

import com.cryptocaddy.xchange.data.model.*;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;
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

    public static final String API_KEY_PARAM = "api key";
    public static final String API_SECRET_PARAM = "api secret";
    public static final String API_PASSPHRASE_PARAM = "passphrase";

    protected String wrappedXchangeName;
    public ExchangeController(){
        wrappedXchangeName = getWrappedXchangeName();
    }

    /**
     * Every class that extends this base class needs to implement this to return the corresponding Xchange exchange class name that is being wrapped.
     * @return
     */
    protected abstract String getWrappedXchangeName();

    /**
     * List of pairs of parameters and corresponding descriptions that are uniquely required by each exchange.
     * @return
     */
    public ParameterList requiredParameters(){
        ParameterList requiredParameters = new ParameterList();
        requiredParameters.add(API_KEY_PARAM, JsonFormatTypes.STRING);
        requiredParameters.add(API_SECRET_PARAM, JsonFormatTypes.STRING);
        return requiredParameters;
    }

    /**
     * Override this in subclasses for exchanges that need more data than just account key and secret for api calls
     * @return exchange specification used to create the exchange.
     * @param params
     */
    @Override
    public ExchangeSpecification getXchangeSpecification(Map<String, String> params){

        ExchangeSpecification specification = new ExchangeSpecification(this.wrappedXchangeName);
        if (params == null)
            return specification;

        if (params.containsKey(API_KEY_PARAM))
            specification.setApiKey(params.get(API_KEY_PARAM));
        if (params.containsKey(API_SECRET_PARAM))
            specification.setSecretKey(params.get(API_SECRET_PARAM));

        //for each parameter that we need in addition to key and secret, ensure we were provided a value, and assign it.
        if (params != null){
            for (String parameterKey : params.keySet()) {

                //If true continue because we just manually assigned these values
                if (parameterKey.equalsIgnoreCase(API_KEY_PARAM) || parameterKey.equalsIgnoreCase(API_SECRET_PARAM))
                    continue;

                String parameterValue = params.get(parameterKey);
                if (parameterValue == null){
                    System.out.println(parameterKey + "was not specified for exchange specification: " + wrappedXchangeName);
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
     * @param params
     */
    @Override
    public Exchange getXchangeExchange(Map<String, String> params){

        return ExchangeFactory.INSTANCE.createExchange(getXchangeSpecification(params));
    }


    /**
     * Used to get user specific account info
     * @param params
     * @return
     */
    @Override
    public AccountInfo getXchangeAccountInfo(Map<String, String> params) {

        AccountService accountService = getXchangeExchange(params).getAccountService();

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

    /**
     * Get all of the coin wallets associated with the user on the exchange
     * @param params
     * @return
     */
    @Override
    public List<Coin> getAllCoins(Map<String, String> params){

        List<Coin> coinList = new ArrayList<>();

        AccountInfo accountInfo = getXchangeAccountInfo(params);
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


    /**
     * Get the trade history associated with the user on the exchange
     * @param params
     * @return
     */
    @Override
    public TransactionHistory getTransactionHistory(Map<String, String> params){

        TransactionHistory txHistory = null;

        Exchange exchange = getXchangeExchange(params);
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
        /* NOT IMPLEMENTED
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
