package com.cryptocaddy.xchange.data.model;

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

    private String symbol;
    private String currencyCode;
    private String displayName;

    private BigDecimal totalQuantity;
    private BigDecimal available;
    private BigDecimal availableForWithdrawal;
    private BigDecimal withdrawing;
    private BigDecimal depositing;

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

    public Currency getBackingCurrency() {
        return backingCurrency;
    }

    public void setBackingCurrency(Currency backingCurrency) {
        this.backingCurrency = backingCurrency;
    }

    public Balance getBackingBalance() {
        return backingBalance;
    }

    public void setBackingBalance(Balance backingBalance) {
        this.backingBalance = backingBalance;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public BigDecimal getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(BigDecimal totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public BigDecimal getAvailable() {
        return available;
    }

    public void setAvailable(BigDecimal available) {
        this.available = available;
    }

    public BigDecimal getAvailableForWithdrawal() {
        return availableForWithdrawal;
    }

    public void setAvailableForWithdrawal(BigDecimal availableForWithdrawal) {
        this.availableForWithdrawal = availableForWithdrawal;
    }

    public BigDecimal getWithdrawing() {
        return withdrawing;
    }

    public void setWithdrawing(BigDecimal withdrawing) {
        this.withdrawing = withdrawing;
    }

    public BigDecimal getDepositing() {
        return depositing;
    }

    public void setDepositing(BigDecimal depositing) {
        this.depositing = depositing;
    }

}
