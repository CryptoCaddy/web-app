package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.core.exchanges.SupportedExchanges;
import com.cryptocaddy.services.auditing.resource.model.Result;
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
