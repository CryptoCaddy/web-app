package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.model.response.ResponseSupportedExchanges;
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

    public ResponseSupportedExchanges getSupportedExchanges() {

        ResponseSupportedExchanges responseSupportedExchanges = new ResponseSupportedExchanges();
        for (ExchangeType exchange : ExchangeType.values()) {
            IExchangeController controller = abstractExchangeFactory.getExchangeController(exchange);
            String exchangeName = exchange.name();
            ParameterList exchangeParameters = controller.requiredParameters();
            responseSupportedExchanges.addSupportedExchange(exchangeName, exchangeParameters);
        }

        return responseSupportedExchanges;

    }

}
