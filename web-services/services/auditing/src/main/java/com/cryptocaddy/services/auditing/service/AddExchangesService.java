package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchanges;
import com.cryptocaddy.services.auditing.model.attributes.Exchange;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddExchangesService {

    public Result addExchanges(RequestAddExchanges requestAddExchanges) {
        List<Exchange> exchangeList = requestAddExchanges.getExchangeList();
        String username = requestAddExchanges.getUsername();
        String password = requestAddExchanges.getPassword();

        // TODO: 1/13/2018 - Wire up to some core method that will add these exchanges to a user's account in db/cloud-storage

        return new Result("Success");
    }

}
