package com.cryptocaddy.xchange.data.exchanges;

import com.cryptocaddy.xchange.data.model.Coin;
import com.cryptocaddy.xchange.data.model.TransactionHistory;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.dto.account.AccountInfo;

import java.util.HashMap;
import java.util.List;

public interface IExchangeController {

    ExchangeSpecification getXchangeSpecification(String exchangeName, String exchangeKey, String exchangeSecret,
                                                  HashMap<String, String> params);

    Exchange getExchange(String exchangeName, String exchangeKey, String exchangeSecret,
                         HashMap<String, String> params);

    AccountInfo getAccountInfo(String exchangeName, String exchangeKey, String exchangeSecret,
                               HashMap<String, String> params);

    List<Coin> getAllCoins(String exchangeName, String exchangeKey, String exchangeSecret,
                           HashMap<String, String> params);

    TransactionHistory getTransactionHistory(String exchangeName, String exchangeKey, String exchangeSecret,
                                             HashMap<String, String> params);


}
