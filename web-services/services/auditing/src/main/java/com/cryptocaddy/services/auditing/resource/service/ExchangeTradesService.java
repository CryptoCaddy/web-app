package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.core.exchanges.ExchangeController;
import com.cryptocaddy.core.exchanges.ExchangeControllerBuilder;
import com.cryptocaddy.core.model.TransactionHistory;
import com.cryptocaddy.services.auditing.resource.model.attributes.Exchange;
import org.springframework.stereotype.Service;

@Service
public class ExchangeTradesService {

    public TransactionHistory getExchangeTrades(Exchange exchange) {
        String exchangeName = exchange.getExchangeName();
        String exchangeKey = exchange.getExchangeKey();
        String exchangeSecret = exchange.getExchangeSecret();
        String exchangePass = exchange.getExchangePass();


        ExchangeController controller = ExchangeControllerBuilder.createExchangeController(exchangeName, exchangeKey, exchangeSecret, exchangePass);
        return controller.getTransactionHistory();

    }

}
