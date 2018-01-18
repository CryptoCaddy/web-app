package com.cryptocaddy.services.auditing.resource.controller;

import com.cryptocaddy.core.model.TransactionHistory;
import com.cryptocaddy.services.auditing.resource.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.resource.api.ExchangeTradesApi;
import com.cryptocaddy.services.auditing.resource.api.ExchangeWalletsApi;
import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.attributes.Exchange;
import com.cryptocaddy.services.auditing.resource.service.ExchangeTradesService;
import com.cryptocaddy.services.auditing.resource.service.ExchangeWalletsService;
import com.cryptocaddy.services.auditing.resource.validation.ExchangeValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Jon Waggoner
 * Date: 1/18/2018
 */
@RestController
public class ExchangeTradesApiController extends AbstractRestHandler implements ExchangeTradesApi {
    private ExchangeTradesService exchangeTradesService;

    @Autowired
    public ExchangeTradesApiController(ExchangeTradesService exchangeTradesService) {
        this.exchangeTradesService = exchangeTradesService;
    }

    @Override
    public ResponseEntity<TransactionHistory> getExchangeTrades(Exchange exchange) {

        ExchangeValidator exchangeValidator = new ExchangeValidator();
        if (!exchangeValidator.test(exchange)) {
            return new ResponseEntity<>(new TransactionHistory(), HttpStatus.BAD_REQUEST);
        }

        TransactionHistory result = exchangeTradesService.getExchangeTrades(exchange);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
