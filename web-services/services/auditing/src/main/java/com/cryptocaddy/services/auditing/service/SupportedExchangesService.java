package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.xchange.data.exchanges.ExchangeType;
import org.springframework.stereotype.Service;

@Service
public class SupportedExchangesService {

    public Result getSupportedExchanges() {

        Result result = new Result("Success");
        for (ExchangeType exchange : ExchangeType.values()) {
            result.addResult(exchange.name());
        }

        return result;

    }

}
