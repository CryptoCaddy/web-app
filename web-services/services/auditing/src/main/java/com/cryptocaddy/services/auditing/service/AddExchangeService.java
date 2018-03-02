package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.libraries.database.dao.UserExchangeRepository;
import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import com.cryptocaddy.fiat.client.service.IFiatEngineService;
import com.cryptocaddy.libraries.database.dao.User;
import com.cryptocaddy.libraries.database.dao.UserExchange;
import com.cryptocaddy.libraries.database.dao.UserRepository;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper;
import com.cryptocaddy.services.common.authentication.JWTBody;
import com.cryptocaddy.xchange.data.exchanges.IExchangeController;
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory;
import com.cryptocaddy.xchange.data.model.Coin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AddExchangeService {


    private final AbstractExchangeFactory abstractExchangeFactory;
    private UserRepository userRepository;
    private UserExchangeRepository userExchangeRepository;

    @Autowired
    public AddExchangeService(AbstractExchangeFactory abstractExchangeFactory, UserRepository userRepository, UserExchangeRepository userExchangeRepository) {
        this.abstractExchangeFactory = abstractExchangeFactory;
        this.userRepository = userRepository;
        this.userExchangeRepository = userExchangeRepository;
    }

    public ResponseExchangeWrapper addExchange(JWTBody userJWTBody, RequestAddExchange requestAddExchange) {

        User user = userRepository.findUserByUid(userJWTBody.getUid());

        IExchangeController controller = abstractExchangeFactory.getExchangeController(requestAddExchange.getExchangeName());
        List<Coin> coinList = controller != null ? controller.getAllCoins(requestAddExchange.getParameters()) : new ArrayList<>();

        Map pList = requestAddExchange.getParameters();
        String key = (String)pList.get(ExchangeController.API_KEY_PARAM);
        String secret = (String)pList.get(ExchangeController.API_SECRET_PARAM);
        Object nullablePass = pList.get(ExchangeController.API_PASSPHRASE_PARAM);
        String passphrase = (nullablePass != null) ? (String)nullablePass : null;


        UserExchange userExchange = new UserExchange(requestAddExchange.getExchangeName(), key, secret, passphrase);
        userExchange.setUser(user);
        userExchangeRepository.save(userExchange);

        ResponseExchangeWrapper wrapper = new ResponseExchangeWrapper(requestAddExchange.getExchangeName());
        wrapper.setExchangeEntryId(userExchange.getId());
        wrapper.setExchangeCoins(coinList);
        return  wrapper;


    }

}
