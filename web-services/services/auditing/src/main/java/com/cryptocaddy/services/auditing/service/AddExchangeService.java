package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.db.entity.Exchange;
import com.cryptocaddy.services.auditing.db.entity.User;
import com.cryptocaddy.services.auditing.db.entity.UserExchange;
import com.cryptocaddy.services.auditing.db.entity.UserExchangeGdax;
import com.cryptocaddy.services.auditing.db.repository.ExchangeRepository;
import com.cryptocaddy.services.auditing.db.repository.UserExchangeGdaxRepository;
import com.cryptocaddy.services.auditing.db.repository.UserExchangeRepository;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper;
import com.cryptocaddy.services.auditing.security.JWTAuthentication;
import com.cryptocaddy.xchange.data.exchanges.IExchangeController;
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory;
import com.cryptocaddy.xchange.data.model.Coin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.NonTransientDataAccessException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.cryptocaddy.xchange.data.exchanges.ExchangeController.API_KEY_PARAM;
import static com.cryptocaddy.xchange.data.exchanges.ExchangeController.API_SECRET_PARAM;
import static com.cryptocaddy.xchange.data.exchanges.GdaxController.API_PASSPHRASE_PARAM;

@Service
public class AddExchangeService {

    private final AbstractExchangeFactory abstractExchangeFactory;
    private final ExchangeRepository exchangeRepository;
    private final UserExchangeRepository userExchangeRepository;
    private final UserExchangeGdaxRepository userExchangeGdaxRepository;

    @Autowired
    public AddExchangeService(AbstractExchangeFactory abstractExchangeFactory, ExchangeRepository exchangeRepository, UserExchangeRepository userExchangeRepository, UserExchangeGdaxRepository userExchangeGdaxRepository) {
        this.abstractExchangeFactory = abstractExchangeFactory;
        this.exchangeRepository = exchangeRepository;
        this.userExchangeRepository = userExchangeRepository;
        this.userExchangeGdaxRepository  = userExchangeGdaxRepository;
    }

    public ResponseExchangeWrapper addExchange(RequestAddExchange requestAddExchange) {
        //get the authenticated user
        User user = ((JWTAuthentication) SecurityContextHolder.getContext().getAuthentication()).getUser();

        //get the exchange being added
        Exchange exchange = exchangeRepository.findByName(requestAddExchange.getExchangeName());

        //error if the exchange isn't found
        if(exchange == null) {
            return null;//todo return a proper error
        }

        //try using the api keys to access the user's holdings on the exchange (this throws an exception on error)
        IExchangeController controller = abstractExchangeFactory.getExchangeController(requestAddExchange.getExchangeName());
        List<Coin> coinList = controller != null ? controller.getAllCoins(requestAddExchange.getParameters()) : new ArrayList<>();

        //save the user-exchange pair in the db
        UserExchange userExchange = new UserExchange();
        userExchange.setUser(user);
        userExchange.setExchange(exchange);
        //userExchange.setNickname(nickname);
        userExchange.setApikey(requestAddExchange.getParameters().get(API_KEY_PARAM));
        userExchange.setApisecret(requestAddExchange.getParameters().get(API_SECRET_PARAM));
        try {
            userExchange = userExchangeRepository.save(userExchange);
        } catch (NonTransientDataAccessException e) {
            e.printStackTrace();
            return null;//todo return a proper error
        }

        //save the passphrase for gdax
        if(requestAddExchange.getExchangeName().equalsIgnoreCase("GDAX")) {
            UserExchangeGdax userExchangeGdax = new UserExchangeGdax();
            userExchangeGdax.setUserExchange(userExchange);
            userExchangeGdax.setGdaxParaphrase(requestAddExchange.getParameters().get(API_PASSPHRASE_PARAM));
            userExchangeGdaxRepository.save(userExchangeGdax);
            try {
                userExchangeGdaxRepository.save(userExchangeGdax);
            } catch (NonTransientDataAccessException e) {
                e.printStackTrace();
                return null;//todo return a proper error
            }
        }

        //return the coins found
        ResponseExchangeWrapper wrapper = new ResponseExchangeWrapper(requestAddExchange.getExchangeName());
        wrapper.setExchangeCoins(coinList);
        return  wrapper;
    }

}
