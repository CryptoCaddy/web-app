package com.cryptocaddy.services.auditing.resource.controller;

import com.cryptocaddy.services.auditing.resource.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.resource.api.ExchangeWalletsApi;
import com.cryptocaddy.services.auditing.resource.api.SupportedExchangesApi;
import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.Result;
import com.cryptocaddy.services.auditing.resource.model.attributes.Exchange;
import com.cryptocaddy.services.auditing.resource.service.ExchangeWalletsService;
import com.cryptocaddy.services.auditing.resource.service.SupportedExchangesService;
import com.cryptocaddy.services.auditing.resource.validation.ExchangeWalletsValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Jon Waggoner
 * Date: 1/18/2018
 */
@RestController
public class SupportedExchangesApiController extends AbstractRestHandler implements SupportedExchangesApi {
    private SupportedExchangesService supportedExchangesService;

    @Autowired
    public SupportedExchangesApiController(SupportedExchangesService supportedExchangesService) {
        this.supportedExchangesService = supportedExchangesService;
    }

    @Override
    public ResponseEntity<Result> getSupportedExchanges() {

        Result result = supportedExchangesService.getSupportedExchanges();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
