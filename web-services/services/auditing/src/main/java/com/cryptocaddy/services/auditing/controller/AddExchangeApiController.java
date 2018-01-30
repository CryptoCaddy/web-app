package com.cryptocaddy.services.auditing.controller;

import com.cryptocaddy.services.auditing.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.api.AddExchangeApi;
import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.auditing.model.response.ExchangeWrapperResponse;
import com.cryptocaddy.services.auditing.service.AddExchangeService;
import com.cryptocaddy.services.auditing.validation.AddExchangeValidator;
import com.cryptocaddy.xchange.data.exchanges.ExchangeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AddExchangeApiController extends AbstractRestHandler implements AddExchangeApi {
    private AddExchangeService addExchangeService;

    @Autowired
    public AddExchangeApiController(AddExchangeService addExchangeService) {
        this.addExchangeService = addExchangeService;
    }

    @Override
    public ResponseEntity<ExchangeWrapperResponse> addExchange(@RequestHeader(value="Authorization") String authorization, @RequestBody RequestAddExchange requestAddExchange){


        AddExchangeValidator addExchangeValidator = new AddExchangeValidator();
        /*if (!addExchangeValidator.test(requestAddExchange)) {
            return new ResponseEntity<>(new Result("Failed"), HttpStatus.BAD_REQUEST);
        }*/


        ExchangeWrapperResponse exchangeWrapperResponse = new ExchangeWrapperResponse(ExchangeType.valueOf(requestAddExchange.getExchangeName().toUpperCase()));

        //Result result = addExchangeService.addExchange(requestAddExchange);

        return new ResponseEntity<>(exchangeWrapperResponse, HttpStatus.OK);
    }

}
