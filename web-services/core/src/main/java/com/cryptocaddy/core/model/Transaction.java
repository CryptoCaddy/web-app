package com.cryptocaddy.core.model;

import org.knowm.xchange.currency.CurrencyPair;
import org.knowm.xchange.dto.trade.UserTrade;

import java.math.BigDecimal;
import java.util.Date;

public class Transaction {

    private CurrencyPair currencyPair;
    private String orderID;
    
    private BigDecimal originalAmount;
    private BigDecimal price;
    private BigDecimal feeAmount;
    private String feeCurrency;

    private Date txTimestamp;


    public Transaction(UserTrade userTrade){

        currencyPair = userTrade.getCurrencyPair();
        originalAmount = userTrade.getOriginalAmount();
        feeAmount = userTrade.getFeeAmount();
        price = userTrade.getPrice();

        orderID = userTrade.getOrderId();
        txTimestamp = userTrade.getTimestamp();
        feeCurrency = userTrade.getFeeCurrency().getSymbol();

    }

    public BigDecimal getFeeAmount() {
        return feeAmount;
    }

    public BigDecimal getOriginalAmount() {
        return originalAmount;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public CurrencyPair getCurrencyPair() {
        return currencyPair;
    }

    public String getOrderID() {
        return orderID;
    }

    public Date getTxTimestamp() {
        return txTimestamp;
    }

    public String getFeeCurrency() {
        return feeCurrency;
    }
}
