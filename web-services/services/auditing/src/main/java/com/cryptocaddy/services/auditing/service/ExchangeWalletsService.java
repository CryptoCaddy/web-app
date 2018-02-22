package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.fiat.client.service.IFiatEngineService;
import com.cryptocaddy.libraries.database.dao.User;
import com.cryptocaddy.libraries.database.dao.UserExchange;
import com.cryptocaddy.libraries.database.dao.UserExchangeRepository;
import com.cryptocaddy.libraries.database.dao.UserRepository;
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper;
import com.cryptocaddy.services.auditing.model.response.ResponseUserData;
import com.cryptocaddy.services.common.authentication.JWTBody;
import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import com.cryptocaddy.xchange.data.exchanges.IExchangeController;
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory;

import com.cryptocaddy.xchange.data.model.Coin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExchangeWalletsService {
    private final AbstractExchangeFactory abstractExchangeFactory;
    private UserRepository userRepository;
    private UserExchangeRepository userExchangeRepository;

    @Autowired
    public ExchangeWalletsService(AbstractExchangeFactory abstractExchangeFactory, UserRepository userRepository, UserExchangeRepository userExchangeRepository) {
        this.abstractExchangeFactory = abstractExchangeFactory;
        this.userRepository = userRepository;
        this.userExchangeRepository = userExchangeRepository;
    }

    public ResponseUserData getExchangeWallets(JWTBody jwtBody) {


        User user = userRepository.findUserByUid(jwtBody.getUid());

        //TODO: get the exchanges that the user has added to their account
        List<UserExchange> exchanges = user.getExchanges();

        ResponseUserData response = new ResponseUserData();

        for (UserExchange userExchange : exchanges){
            IExchangeController controller = abstractExchangeFactory.getExchangeController(userExchange.getName());

            Map<String, String> parameters = new HashMap<>();
            parameters.put(ExchangeController.API_KEY_PARAM, userExchange.getApiKey());
            parameters.put(ExchangeController.API_SECRET_PARAM, userExchange.getSecret());

            if (userExchange.getPassphrase() != null)
                parameters.put(ExchangeController.API_PASSPHRASE_PARAM, userExchange.getPassphrase());

            List<Coin> coinList = controller != null ? controller.getAllCoins(parameters) : new ArrayList<>();

            ResponseExchangeWrapper wrapper = new ResponseExchangeWrapper(userExchange.getName());
            wrapper.setExchangeCoins(coinList);

            response.addExchangeWrapper(wrapper);

        }

        return response;

    }

}
