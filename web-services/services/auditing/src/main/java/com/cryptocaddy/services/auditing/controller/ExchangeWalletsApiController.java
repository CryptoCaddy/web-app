package com.cryptocaddy.services.auditing.controller;

import com.cryptocaddy.services.auditing.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.api.ExchangeWalletsApi;
import com.cryptocaddy.services.auditing.model.AuditReport;
import com.cryptocaddy.services.auditing.model.attributes.Exchange;
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper;
import com.cryptocaddy.services.auditing.model.response.ResponseUserData;
import com.cryptocaddy.services.auditing.service.ExchangeWalletsService;
import com.cryptocaddy.services.auditing.validation.ExchangeValidator;
import com.cryptocaddy.services.common.authentication.JWTAuthenticator;
import com.cryptocaddy.services.common.authentication.JWTBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
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
    public ResponseEntity<ResponseUserData> getExchangeWallets(@RequestHeader(value="Authorization") String authorization) {

        JWTBody jwtBody = JWTAuthenticator.getBodyFromToken(authorization);

        ResponseUserData result = exchangeWalletsService.getExchangeWallets(jwtBody);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
