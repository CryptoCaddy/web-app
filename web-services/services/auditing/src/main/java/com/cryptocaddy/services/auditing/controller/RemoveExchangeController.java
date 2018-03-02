package com.cryptocaddy.services.auditing.controller;

import com.cryptocaddy.services.auditing.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.api.AddExchangeApi;
import com.cryptocaddy.services.auditing.api.RemoveExchangeApi;
import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper;
import com.cryptocaddy.services.auditing.service.AddExchangeService;
import com.cryptocaddy.services.auditing.service.RemoveExchangeService;
import com.cryptocaddy.services.common.authentication.JWTAuthenticator;
import com.cryptocaddy.services.common.authentication.JWTBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RemoveExchangeController extends AbstractRestHandler implements RemoveExchangeApi {
    private RemoveExchangeService removeExchangeService;

    @Autowired
    public RemoveExchangeController(RemoveExchangeService removeExchangeService) {
        this.removeExchangeService = removeExchangeService;
    }

    @Override
    public ResponseEntity<Result> removeExchange(@RequestHeader(value="Authorization") String authorization, @RequestParam long exchangeIdRemove){

        JWTBody jwtBody = JWTAuthenticator.getBodyFromToken(authorization);

        Result response = removeExchangeService.removeExchange(jwtBody, exchangeIdRemove);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}