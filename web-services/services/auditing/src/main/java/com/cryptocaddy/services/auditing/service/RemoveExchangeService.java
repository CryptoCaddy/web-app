package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.libraries.database.dao.User;
import com.cryptocaddy.libraries.database.dao.UserExchange;
import com.cryptocaddy.libraries.database.dao.UserExchangeRepository;
import com.cryptocaddy.libraries.database.dao.UserRepository;
import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper;
import com.cryptocaddy.services.common.authentication.JWTBody;
import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import com.cryptocaddy.xchange.data.exchanges.IExchangeController;
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory;
import com.cryptocaddy.xchange.data.model.Coin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
@Transactional
public class RemoveExchangeService {

    private UserRepository userRepository;
    private UserExchangeRepository userExchangeRepository;

    @Autowired
    public RemoveExchangeService(UserRepository userRepository, UserExchangeRepository userExchangeRepository) {
        this.userRepository = userRepository;
        this.userExchangeRepository = userExchangeRepository;
    }

    public Result removeExchange(JWTBody userJWTBody, Long exchangeIdRemove) {

        User user = userRepository.findUserByUid(userJWTBody.getUid());
        UserExchange ux = userExchangeRepository.findById(exchangeIdRemove);
        if (ux.getUser().getUid() != user.getUid()){
            //we have somehow ended up somewhere very bad. The requested exchange to be removed is not owned by this user.
            //TODO: handle this error properly
            return null;
        }

        userExchangeRepository.removeById(exchangeIdRemove);
        return new Result("Success");

    }

}