package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.dao.User;
import com.cryptocaddy.services.auditing.dao.UserRepository;
import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestCreateAccount;
import com.cryptocaddy.services.common.authentication.JWTAuthenticator;
import com.cryptocaddy.services.common.authentication.JWTBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateAccountService {
    private UserRepository userRepository;

    @Autowired
    public CreateAccountService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Result createAccount(RequestCreateAccount requestCreateAccount) {

        JWTBody jwtBody = JWTAuthenticator.getBodyFromToken(requestCreateAccount.getToken());
        User user = new User(jwtBody.getUid(), jwtBody.getEmail(), jwtBody.getName());
        userRepository.save(user);

        return new Result("Success");
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
