package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.core.exchanges.Coin;
import com.cryptocaddy.core.exchanges.ExchangeController;
import com.cryptocaddy.core.exchanges.ExchangeControllerBuilder;
import com.cryptocaddy.core.exchanges.SupportedExchanges;
import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.Result;
import com.cryptocaddy.services.auditing.resource.model.attributes.Exchange;
import com.cryptocaddy.services.common.builder.Builder;
import org.springframework.stereotype.Service;

import java.util.List;

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
