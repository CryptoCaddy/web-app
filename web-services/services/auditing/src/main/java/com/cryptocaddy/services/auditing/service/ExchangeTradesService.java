package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.fiat.client.service.IFiatEngineService;
import com.cryptocaddy.xchange.data.exchanges.ExchangeType;
import com.cryptocaddy.xchange.data.exchanges.IExchangeController;
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory;
import com.cryptocaddy.xchange.data.model.Coin;
import com.cryptocaddy.xchange.data.model.TransactionHistory;
import com.cryptocaddy.services.auditing.model.attributes.Exchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class ExchangeTradesService {
    private final IFiatEngineService fiatEngineService;
    private final AbstractExchangeFactory abstractExchangeFactory;

    @Autowired
    public ExchangeTradesService(IFiatEngineService fiatEngineService, AbstractExchangeFactory abstractExchangeFactory) {
        this.abstractExchangeFactory = abstractExchangeFactory;
        this.fiatEngineService = fiatEngineService;
    }

    public TransactionHistory getExchangeTrades(Exchange exchange) {
        String exchangeName = exchange.getExchangeName();
        String exchangeKey = exchange.getExchangeKey();
        String exchangeSecret = exchange.getExchangeSecret();
        String exchangePass = exchange.getExchangePass();

        //TODO: this map actually needs to be passed from front end not created here.
        HashMap<String, String> params = new HashMap<>();
        params.put("passphrase", exchangePass);

        IExchangeController controller = abstractExchangeFactory.getExchangeController(ExchangeType.valueOf(exchangeName.toUpperCase()));
        List<Coin> coinList = controller != null ? controller.getAllCoins(params) : new ArrayList<>();
        TransactionHistory txHistory = controller.getTransactionHistory(params);

        // Convert crypto value via Fiat Engine
        //List<FiatCoin> fiatCoinList = this.fiatEngineService.convertValues(txHistory, exchangeName);

        return txHistory;

    }

}
