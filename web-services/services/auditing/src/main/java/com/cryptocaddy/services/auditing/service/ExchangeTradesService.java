package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.fiat.client.entity.FiatCoin;
import com.cryptocaddy.fiat.client.service.IFiatEngineService;
import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import com.cryptocaddy.xchange.data.exchanges.ExchangeControllerBuilder;
import com.cryptocaddy.xchange.data.model.TransactionHistory;
import com.cryptocaddy.services.auditing.model.attributes.Exchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class ExchangeTradesService {

    private final IFiatEngineService fiatEngineService;

    @Autowired
    public ExchangeTradesService(IFiatEngineService fiatEngineService) {
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

        ExchangeController controller = ExchangeControllerBuilder.createExchangeController(exchangeName, exchangeKey, exchangeSecret, params);
        TransactionHistory txHistory = controller.getTransactionHistory();

        // Convert crypto value via Fiat Engine
        //List<FiatCoin> fiatCoinList = this.fiatEngineService.convertValues(txHistory, exchangeName);

        return txHistory;

    }

}
