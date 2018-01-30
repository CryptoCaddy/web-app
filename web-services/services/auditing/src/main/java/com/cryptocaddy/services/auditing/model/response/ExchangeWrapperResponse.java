package com.cryptocaddy.services.auditing.model.response;

import com.cryptocaddy.xchange.data.exchanges.ExchangeType;
import com.cryptocaddy.xchange.data.model.Coin;
import com.cryptocaddy.xchange.data.model.TransactionHistory;

import java.util.List;

public class ExchangeWrapperResponse {

    private String exchangeName;
    private TransactionHistory txHistory;
    private List<Coin> exchangeCoins;

    public ExchangeWrapperResponse(ExchangeType exchangeType){
        exchangeName = exchangeType.name();
    }

    public List<Coin> getExchangeCoins() {
        return exchangeCoins;
    }

    public String getExchangeName() {
        return exchangeName;
    }

    public TransactionHistory getTxHistory() {
        return txHistory;
    }

    public void setExchangeCoins(List<Coin> exchangeCoins) {
        this.exchangeCoins = exchangeCoins;
    }

    public void setExchangeName(String exchangeName) {
        this.exchangeName = exchangeName;
    }

    public void setTxHistory(TransactionHistory txHistory) {
        this.txHistory = txHistory;
    }
}
