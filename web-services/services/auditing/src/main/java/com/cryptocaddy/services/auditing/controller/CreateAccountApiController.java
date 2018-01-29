package com.cryptocaddy.services.auditing.controller;

import com.cryptocaddy.services.auditing.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.api.CreateAccountApi;
import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.attributes.CreateAccountRequestBody;
import com.cryptocaddy.services.auditing.service.CreateAccountService;
import com.cryptocaddy.services.auditing.validation.CreateAccountValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@RestController
public class CreateAccountApiController extends AbstractRestHandler implements CreateAccountApi {
    private CreateAccountService createAccountService;

    @Autowired
    public CreateAccountApiController(CreateAccountService createAccountService) {
        this.createAccountService = createAccountService;
    }

    @Override
    public ResponseEntity<Result> createAccountPost(CreateAccountRequestBody createAccountRequestBody) {

        CreateAccountValidator createAccountValidator = new CreateAccountValidator();
        if (!createAccountValidator.test(createAccountRequestBody)) {
            return new ResponseEntity<>(new Result("Failed"), HttpStatus.BAD_REQUEST);
        }

        Result result = createAccountService.createAccount(createAccountRequestBody);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
