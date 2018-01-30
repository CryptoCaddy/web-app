package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.model.response.SupportedExchangesResponse;
import com.cryptocaddy.xchange.data.exchanges.ExchangeType;
import com.cryptocaddy.xchange.data.exchanges.IExchangeController;
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory;
import com.cryptocaddy.xchange.data.model.ParameterList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupportedExchangesService {

    private final AbstractExchangeFactory abstractExchangeFactory;

    @Autowired
    public SupportedExchangesService(AbstractExchangeFactory abstractExchangeFactory) {

        this.abstractExchangeFactory = abstractExchangeFactory;
    }

    public SupportedExchangesResponse getSupportedExchanges() {

        SupportedExchangesResponse supportedExchangesResponse = new SupportedExchangesResponse();
        for (ExchangeType exchange : ExchangeType.values()) {
            IExchangeController controller = abstractExchangeFactory.getExchangeController(exchange);
            String exchangeName = exchange.name();
            ParameterList<String, String> exchangeParameters = controller.requiredParameters();
            supportedExchangesResponse.addSupportedExchange(exchangeName, exchangeParameters);
        }

        return supportedExchangesResponse;

    }

}
