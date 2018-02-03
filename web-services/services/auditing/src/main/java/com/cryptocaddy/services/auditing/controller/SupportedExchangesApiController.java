package com.cryptocaddy.services.auditing.controller;

import com.cryptocaddy.services.auditing.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.api.SupportedExchangesApi;
import com.cryptocaddy.services.auditing.model.response.ResponseSupportedExchanges;
import com.cryptocaddy.services.auditing.service.SupportedExchangesService;
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
    public ResponseEntity<ResponseSupportedExchanges> getSupportedExchanges() {

        ResponseSupportedExchanges result = supportedExchangesService.getSupportedExchanges();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
