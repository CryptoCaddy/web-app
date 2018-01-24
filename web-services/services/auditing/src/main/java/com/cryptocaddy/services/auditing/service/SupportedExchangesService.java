package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.xchange.data.exchanges.SupportedExchanges;
import com.cryptocaddy.services.auditing.model.Result;
import org.springframework.stereotype.Service;

@Service
public class SupportedExchangesService {

    public Result getSupportedExchanges() {

        Result result = new Result("Success");
        for (SupportedExchanges exchange : SupportedExchanges.values()) {
            result.addResult(exchange.name());
        }

        return result;

    }

}
