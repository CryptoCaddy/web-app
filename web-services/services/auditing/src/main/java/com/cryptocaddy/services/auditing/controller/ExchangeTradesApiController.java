package com.cryptocaddy.services.auditing.controller;

import com.cryptocaddy.xchange.data.model.TransactionHistory;
import com.cryptocaddy.services.auditing.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.api.ExchangeTradesApi;
import com.cryptocaddy.services.auditing.model.attributes.Exchange;
import com.cryptocaddy.services.auditing.service.ExchangeTradesService;
import com.cryptocaddy.services.auditing.validation.ExchangeValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestAttribute;
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
    public ResponseEntity<TransactionHistory> getExchangeTrades(@ModelAttribute Exchange exchange) {

        ExchangeValidator exchangeValidator = new ExchangeValidator();
        if (!exchangeValidator.test(exchange)) {
            return new ResponseEntity<>(new TransactionHistory(), HttpStatus.BAD_REQUEST);
        }

        TransactionHistory result = exchangeTradesService.getExchangeTrades(exchange);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
