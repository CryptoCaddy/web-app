package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.fiat.client.service.IFiatEngineService;
import com.cryptocaddy.services.auditing.model.AuditReport;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper;
import com.cryptocaddy.services.common.authentication.JWTBody;
import com.cryptocaddy.services.common.builder.Builder;
import com.cryptocaddy.xchange.data.exchanges.ExchangeType;
import com.cryptocaddy.xchange.data.exchanges.IExchangeController;
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory;
import com.cryptocaddy.xchange.data.model.Coin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class AddExchangeService {

    private final AbstractExchangeFactory abstractExchangeFactory;

    @Autowired
    public AddExchangeService(AbstractExchangeFactory abstractExchangeFactory) {
        this.abstractExchangeFactory = abstractExchangeFactory;
    }

    public ResponseExchangeWrapper addExchange(JWTBody userJWTBody, RequestAddExchange requestAddExchange) {

        // TODO: 1/13/2018 - Wire up to some core method that will add these exchanges to a user's account in db/cloud-storage


        IExchangeController controller = abstractExchangeFactory.getExchangeController(requestAddExchange.getExchangeName());
        List<Coin> coinList = controller != null ? controller.getAllCoins(requestAddExchange.getParameters()) : new ArrayList<>();

        ResponseExchangeWrapper wrapper = new ResponseExchangeWrapper(requestAddExchange.getExchangeName());
        wrapper.setExchangeCoins(coinList);
        return  wrapper;


    }

}
