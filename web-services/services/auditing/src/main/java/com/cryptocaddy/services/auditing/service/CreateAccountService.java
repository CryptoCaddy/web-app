package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.attributes.CreateAccountRequestBody;
import org.springframework.stereotype.Service;

@Service
public class CreateAccountService {

    public Result createAccount(CreateAccountRequestBody createAccountRequestBody) {
        // TODO: 1/13/2018 - Wire up to some core method that will take this account information and dump into cloud storage

        return new Result("Success");
    }

}
