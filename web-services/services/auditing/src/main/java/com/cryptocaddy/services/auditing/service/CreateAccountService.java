package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestCreateAccount;
import com.cryptocaddy.services.common.authentication.JWTAuthenticator;
import com.cryptocaddy.services.common.authentication.JWTBody;
import org.springframework.stereotype.Service;

@Service
public class CreateAccountService {

    public Result createAccount(RequestCreateAccount requestCreateAccount) {
        // TODO: 1/13/2018 - Wire up to some core method that will add this user to the database
        JWTBody jwtBody = JWTAuthenticator.getBodyFromToken(requestCreateAccount.getToken());

        return new Result("Success");
    }

}
