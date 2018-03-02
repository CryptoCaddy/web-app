package com.cryptocaddy.services.auditing.model.response;

import com.cryptocaddy.xchange.data.exchanges.ExchangeType;
import com.cryptocaddy.xchange.data.model.Coin;
import com.cryptocaddy.xchange.data.model.TransactionHistory;

import java.util.List;

public class ResponseExchangeWrapper {

    //this is not the id of the exchange itself. this is the id of the entry in the user_exchange table.
    private long exchangeEntryId;

    private String exchangeName;
    private TransactionHistory txHistory;
    private List<Coin> exchangeCoins;

    public ResponseExchangeWrapper(ExchangeType exchangeType){
        exchangeName = exchangeType.name();
    }

    public ResponseExchangeWrapper(String exchangeName){
        this.exchangeName = exchangeName;
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

    public long getExchangeEntryId() {
        return exchangeEntryId;
    }

    public void setExchangeEntryId(long exchangeEntryId) {
        this.exchangeEntryId = exchangeEntryId;
    }
}
