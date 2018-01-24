package com.cryptocaddy.services.auditing.controller;

import com.cryptocaddy.services.auditing.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.api.ExchangeWalletsApi;
import com.cryptocaddy.services.auditing.model.AuditReport;
import com.cryptocaddy.services.auditing.model.attributes.Exchange;
import com.cryptocaddy.services.auditing.service.ExchangeWalletsService;
import com.cryptocaddy.services.auditing.validation.ExchangeValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Jon Waggoner
 * Date: 1/18/2018
 */
@RestController
public class ExchangeWalletsApiController extends AbstractRestHandler implements ExchangeWalletsApi {
    private ExchangeWalletsService exchangeWalletsService;

    @Autowired
    public ExchangeWalletsApiController(ExchangeWalletsService exchangeWalletsService) {
        this.exchangeWalletsService = exchangeWalletsService;
    }

    @Override
    public ResponseEntity<AuditReport> getExchangeWallets(Exchange exchange) {

        ExchangeValidator exchangeValidator = new ExchangeValidator();
        if (!exchangeValidator.test(exchange)) {
            return new ResponseEntity<>(new AuditReport(), HttpStatus.BAD_REQUEST);
        }

        AuditReport result = exchangeWalletsService.getExchangeWallets(exchange);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
