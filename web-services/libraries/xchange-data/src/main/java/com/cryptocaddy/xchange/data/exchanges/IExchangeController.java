package com.cryptocaddy.xchange.data.exchanges;

import com.cryptocaddy.xchange.data.model.Coin;
import com.cryptocaddy.xchange.data.model.ParameterList;
import com.cryptocaddy.xchange.data.model.TransactionHistory;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.dto.account.AccountInfo;

import java.util.HashMap;
import java.util.List;

public interface IExchangeController {

    ExchangeSpecification getXchangeSpecification(HashMap<String, String> params);

    Exchange getXchangeExchange(HashMap<String, String> params);

    AccountInfo getXchangeAccountInfo(HashMap<String, String> params);

    List<Coin> getAllCoins(HashMap<String, String> params);

    TransactionHistory getTransactionHistory(HashMap<String, String> params);

    /**
     * List of pairs of parameters and corresponding descriptions that are uniquely required by exchanges.
     * @return
     */
    ParameterList<String, String> requiredParameters();


}
