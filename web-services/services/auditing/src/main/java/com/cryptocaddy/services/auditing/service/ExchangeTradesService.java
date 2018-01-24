package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import com.cryptocaddy.xchange.data.exchanges.ExchangeControllerBuilder;
import com.cryptocaddy.xchange.data.model.TransactionHistory;
import com.cryptocaddy.services.auditing.model.attributes.Exchange;
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
