package com.cryptocaddy.core.model;

import org.knowm.xchange.currency.Currency;
import org.knowm.xchange.dto.account.Balance;

import java.math.BigDecimal;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public class Coin {

    private Currency backingCurrency;
    private Balance backingBalance;

    public String symbol;
    public String currencyCode;
    public String displayName;

    public BigDecimal totalQuantity;
    public BigDecimal available;
    public BigDecimal availableForWithdrawal;
    public BigDecimal withdrawing;
    public BigDecimal depositing;


    public Coin(Currency currency, Balance balance){
        symbol = currency.getSymbol();
        currencyCode = currency.getCurrencyCode();
        displayName = currency.getDisplayName();

        totalQuantity = balance.getTotal();
        available = balance.getAvailable();
        availableForWithdrawal = balance.getAvailableForWithdrawal();
        withdrawing = balance.getWithdrawing();
        depositing = balance.getDepositing();

        backingCurrency = currency;
        backingBalance = balance;
    }

}
