package com.cryptocaddy.xchange.data.exchanges;

import com.cryptocaddy.xchange.data.model.Coin;
import com.cryptocaddy.xchange.data.model.ParameterList;
import com.cryptocaddy.xchange.data.model.TransactionHistory;
import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.dto.account.AccountInfo;

import java.util.List;
import java.util.Map;

public interface IExchangeController {

    ExchangeSpecification getXchangeSpecification(Map<String, String> params);

    Exchange getXchangeExchange(Map<String, String> params);

    AccountInfo getXchangeAccountInfo(Map<String, String> params);

    List<Coin> getAllCoins(Map<String, String> params);

    TransactionHistory getTransactionHistory(Map<String, String> params);

    /**
     * List of pairs of parameters and corresponding descriptions that are uniquely required by exchanges.
     * @return
     */
    ParameterList requiredParameters();


}
