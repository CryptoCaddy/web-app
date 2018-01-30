package com.cryptocaddy.services.auditing.controller;

import com.cryptocaddy.services.auditing.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.api.AddExchangesApi;
import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchanges;
import com.cryptocaddy.services.auditing.service.AddExchangesService;
import com.cryptocaddy.services.auditing.validation.AddExchangesValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@RestController
public class AddExchangesApiApiController extends AbstractRestHandler implements AddExchangesApi {
    private AddExchangesService addExchangesService;

    @Autowired
    public AddExchangesApiApiController(AddExchangesService addExchangesService) {
        this.addExchangesService = addExchangesService;
    }

    @Override
    public ResponseEntity<Result> addExchanges(RequestAddExchanges requestAddExchanges) {


        AddExchangesValidator addExchangesValidator = new AddExchangesValidator();
        /*
        if (!addExchangesValidator.test(requestAddExchanges)) {
            return new ResponseEntity<>(new Result("Failed"), HttpStatus.BAD_REQUEST);
        }*/

        Result result = addExchangesService.addExchanges(requestAddExchanges);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
