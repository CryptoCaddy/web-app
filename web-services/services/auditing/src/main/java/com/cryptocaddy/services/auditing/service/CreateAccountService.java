package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.db.entity.User;
import com.cryptocaddy.services.auditing.db.repository.UserRepository;
import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestCreateAccount;
import com.cryptocaddy.services.auditing.security.JWTAuthentication;
import com.cryptocaddy.services.auditing.security.JWTFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.NonTransientDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class CreateAccountService {

    private final UserRepository userRepository;

    @Autowired
    public CreateAccountService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Result createAccount(RequestCreateAccount requestCreateAccount) {
        //verify the token through firebase
        JWTAuthentication jwt;
        try {
            jwt = JWTFilter.getJWTAuthenticationFromToken(requestCreateAccount.getToken());
        } catch (Exception e) {
            e.printStackTrace();
            return new Result("JWT Failure");//todo make this return a proper status and error, there needs to be a better object to return
        }

        //create the db entry
        User u = new User();
        u.setEmail(requestCreateAccount.getEmail());
        u.setUsername(jwt.getPrincipal().toString());

        //add the token in the db
        try {
            userRepository.save(u);
        } catch (NonTransientDataAccessException e) {//a likely error would be that this user is already registered
            e.printStackTrace();
            return new Result("DB Failure");//todo make this return a proper status and error, there needs to be a better object to return
        }

        return new Result("Success");
    }

}
